const database = require('../database/connection');
const ValidateService = require("../services/ValidateService");

class AnswerController {

    // criando nova resposta
    async create(req, res) {
        let { idQuestion, description, idUser } = req.body;

        // validando dados e retornando se é válido.
        let isValid = await ValidateService.registerAnswers(description);

        if(isValid == false) { // se não for válido, retorna os erros.
            return res.status(400).json({errors: ValidateService.errors});
        } else {

            try {

                await database.insert({
                    description,
                    quant_likes: 0,
                    questions_id: idQuestion,
                    users_id: idUser
                }).into('answers');

                // puxando do banco o número de respostas para determinada pergunta
                const response = await database('questions').select('quant_answers').where('id', idQuestion);
                let quantAnswers = response[0].quant_answers;
                // contabilizando a nova resposta na tabela de questões.
                await database('questions').update({
                    quant_answers: quantAnswers + 1
                }).where('id', idQuestion);

                return res.status(200).json({error: '', status: 'Resposta adicionada com sucesso!'});

            } catch(error) {
                console.log(error);
                return res.status(500).json({error: 'Erro ao adicionar resposta, tente novamente!'});
            }

        }
    }

    async update(req, res) {
        let {id} = req.params;
        let {description, quant_likes, questions_id, users_id} = req.body;

        try {
            await database('answers')
                .update({
                    description,
                    quant_likes,
                    questions_id,
                    users_id
                })
                .where('id', id);

                return res.status(200).json({error: '', status: 'Resposta atualizada com sucesso!'});
        } catch(error) {
            console.log(error);
            return res.status(500).json({error: 'Houve um erro ao atualizar resposta, tente novamente!'});
        }
    }

}

module.exports = new AnswerController;