const slug = require('slug');

const database = require('../database/connection');
const ValidateService = require("../services/ValidateService");

class TagController {

    // criando nova tag
    async create(req, res) {
        let { name, description } = req.body;

        let data = {
            name,
            description
        }

        let isValid = await ValidateService.registerTags(data);

        if(isValid == false) {
            return res.status(400).json({errors: ValidateService.errors});
        } else {

            try {

                await database.insert({
                    name,
                    slug: slug(name, {lower: true}),
                    image: req.file.filename,
                    description,
                    quant_questions: 0
                }).into('tags');

                return res.status(200).json({error: '', status: 'Tag adicionada com sucesso!'});

            } catch(error) {
                console.log(error);
                return res.status(500).json({error: 'Ocorreu um erro ao adicionar nova tag, tente novamente!'});
            }

        }
    }

    async indexTags(req, res) {
        try {
            let tags = await database.select('name', 'slug').table('tags').orderBy('name');            
            return res.status(200).json(tags);
        } catch(error) {
            return res.status(500).json({error: 'Houve um erro ao carregar as tags, tente novamente!'});
        }
    }

    async index(req, res) {
        // pegando dados via query param, atribuindo em variáveis e definindo valores padrões.
        let { search = '', orderBy = 'quant_questions', order = 'desc' } = req.query;

        try {

            let tags = 
                await database
                .select('*')
                .table('tags')
                .whereRaw(`slug like '%${search}%'`)
                .orderBy(orderBy, order);

            let serializedTags = tags.map(tag => {
                return {
                    id: tag.id,
                    name: tag.name,
                    slug: tag.slug,
                    image: tag.image ? `http://18.228.11.123:3333/uploads/${tag.image}` : '',
                    description: tag.description,
                    quant_questions: tag.quant_questions
                }
            });

            return res.status(200).json(serializedTags);

        } catch(error) {
            console.log(error);
            return res.status(500).json({error: 'Houve um erro ao carregar as tags, tente novamente!'});
        }
        



    }

}

module.exports = new TagController;