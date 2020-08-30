const ValidateService = require("../services/ValidateService");
const database = require('../database/connection');

class QuestionController {

    // Listagem de perguntas com filtro de pesquisa e ordenação.
    async index(req, res) {
        let { search, classification, order, page } = req.query;
        //let offset = (page * 8) - 8;

        // caso o usuário não use nenhum filtro, serão atribuídos valores padrão.
        search = search ? search : '';
        classification = classification ? classification : 'creation_date';
        order = order ? order : 'desc';

        // consulta mais flexível, pois permite ao usuário uma busca mais personalizada e restringida.
        let questions = 
            await database
                .select('questions.*', 'tags.slug')
                .table('questions_tags')
                .innerJoin('tags', 'tags.id', 'questions_tags.tags_id')
                .rightJoin('questions', 'questions.id', 'questions_tags.questions_id')
                .whereRaw(`questions.title like '%${search}%' or questions.body like '%${search}%'`)
                .orderBy(`questions.${classification}`, `${order}`);
                //.limit(8).offset(offset);

        let repitItems = []; // armazena o id de registros duplicados.
        // Serializando/adaptando/convertendo dados vindos do banco para o consumo da API no frontend.
        let serializedQuestions = questions.map((item, i) => {
            let data = {tags: []};
            if(!repitItems.includes(item.id)) {
                data = {
                    id: item.id,
                    title: item.title,
                    body: item.body,
                    creation_date: item.creation_date,
                    quant_answers: item.quant_answers,
                    quant_likes: item.quant_likes,
                    users_id: item.users_id,
                    tags: (item.slug) ? [item.slug] : []
                }
                // percorrendo e verificando por registros duplicados.
                questions.forEach((quest, k) => {
                    // caso haja duplicidade, salva a tag no array tags e inclui o id no array repitItems
                    if(i != k && quest.id == item.id) {
                        data.tags.push(quest.slug);
                        repitItems.push(quest.id);
                    }

                });

                return data;
            } else
                return '';

        });

        let index = serializedQuestions.indexOf('');
        // removendo strings vazias do array, antes de mandar o json como resposta.
        while(index >= 0) {
            serializedQuestions.splice(index, 1);
            index = serializedQuestions.indexOf('');
        }

        return res.status(200).json(serializedQuestions);

    }

    async indexByTag(req, res) {
        let { tag } = req.params;

        try {

            let questions = 
            await database
            .select('*')
            .table('questions_tags')
            .innerJoin('questions', 'questions.id', 'questions_tags.questions_id')
            .innerJoin('tags', 'tags.id', 'questions_tags.tags_id')
            .where('tags.slug', tag);

            // serializando perguntas
            let serializedQuestions = questions.map(question => {

                // Formatação da data
                let dateComplete = ValidateService.formatDate(question.creation_date);

                return {
                    id: question.questions_id,
                    title: question.title,
                    body: question.body,
                    creation_date: dateComplete,
                    quant_answers: question.quant_answers,
                    quant_likes: question.quant_likes,
                    user_id: question.users_id,
                    tag: question.slug,
                    image: question.image ? `http://localhost:3333/images/${question.image}` : '',
                    quant_questions: question.quant_questions
                }
            });

            return res.status(200).json(serializedQuestions);

        } catch(error) {
            console.log(error);
            return res.status(500).json({error: 'Erro ao buscar perguntas, tente novamente!'});
        }

    }

    // listagem de uma pergunta específica.
    async find(req, res) {
        let { id } = req.params;

        try {

            // Consultando pergunta pelo id.
            let question = 
                await database
                    .select('questions.*', 'users.name')
                    .table('questions')
                    .innerJoin('users', 'users.id', 'questions.users_id')
                    .where('questions.id', id);

            // Consultando respostas relativas à pergunta solicitada.
            let answers = 
                await database
                    .select('answers.*', 'users.name')
                    .table('answers')
                    .innerJoin('users', 'users.id', 'answers.users_id')
                    .where('questions_id', id)
                    .orderBy('id', 'asc');


            if(question.length > 0) { // encontrou algum registro?
                return res.status(200).json({ // Dados da pergunta e de suas respectivas respostas.
                    question: question[0], 
                    answers: answers
                });
            } else {
                return res.status(400).json({error: 'O código informado não existe na base de dados!'});
            }

        } catch(error) {
            console.log(error);
            return res.status(500).json({error: 'Erro ao buscar pergunta, tente novamente!'});
        }
    }

    // Criação de nova pergunta.
    async create(req, res) {
        let { title, body, tags, user_id } = req.body;

        let data = {title, body, tags};

        // validação dos dados do formulário.
        let isValid = ValidateService.registerQuestion(data);

        if(isValid == false) {
            return res.status(400).json(ValidateService.errors);
        } else {

            // Formatação do datetime para inserir no banco de dados.
            let date = new Date();
            let dateFormat = 
                `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            
            try {

                // insert na tabela questions, com retorno do id do registro inserido.
                let idQuestion = await database.insert({
                    title,
                    body,
                    creation_date: dateFormat,
                    quant_answers: 0,
                    quant_likes: 0,
                    users_id: user_id
                }).into('questions');

                // verificando se existem tags.                
                if(tags.length > 0) {
                    // percorrendo array de tags e inserindo um novo registro pra cada tag.
                    tags.forEach(async tag => {

                        // novo insert na tabela questions_tags, que está ligada com a tabela questions e relaciona a questão com tags que ela possui.
                        let dataTag = await database.select('id').table('tags').where('slug', tag);
               
                        // TABLE QUESTIONS_TAGS
                        await database.insert({
                            questions_id: idQuestion[0],
                            tags_id: dataTag[0].id
                        }).into('questions_tags');
    
    
                        // Selecionando quantidade de perguntas ligadas a uma tag e atualizando o campo quant_perguntas da tabela tags
                        let countQuestions = 
                            await database('questions_tags')
                                .count({ count: '*' })
                                .where('tags_id', dataTag[0].id);
    
                        countQuestions = countQuestions[0].count;
    
                        // TABLE TAGS
                        await database.update({
                            quant_questions: countQuestions
                        }).table('tags').where('id', dataTag[0].id);
    
                    });

                }

                res.status(200).json({error: '', status: 'Cadastro realizado com sucesso!'});

            } catch(error) {
                console.log(error);
                res.status(500).json({error: 'Erro ao cadastrar produto, tente novamente.'});
            }

        }
    }

    async update(req, res) {
        let {id} = req.params;
        let {title, body, creation_date, quant_answers, quant_likes, users_id} = req.body;

        try {
            await database('questions')
            .update({
                title,
                body,
                creation_date,
                quant_answers,
                quant_likes,
                users_id
            })
            .where('id', id);

            return res.status(200).json({error: '', status: 'Pergunta atualizada com sucesso!'});

        } catch(error) {
            console.log(error);
            return res.status(500).json({error: 'Houve um erro ao atuliazar pergunta, tente novamente!'});
        }
    }

}

module.exports = new QuestionController;