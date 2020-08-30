const express = require('express');
const routes = express.Router();

const authByToken = require('../middleware/authToken');
const UserController = require('../controllers/UsersController');
const QuestionController = require('../controllers/QuestionsController');
const AnswerController = require('../controllers/AnswersController');
const TagController = require('../controllers/TagsController');
const QuestionsController = require('../controllers/QuestionsController');
const TagsController = require('../controllers/TagsController');
const uploadImage = require('../middleware/uploadImage');

routes.get('/', (req, res) => {
    res.send('Aplicação funcionando!');
});

// Cadastro de um novo usuário
routes.post('/users', UserController.create);
// Login do usuário
routes.post('/login', UserController.login);

// Listagem de perguntas
routes.get('/questions', QuestionController.index);
// Listagem de uma pergunta específica
routes.get('/questions/:id', QuestionController.find);
//Listagem de perguntas por tag
routes.get('/questions/tag/:tag', QuestionController.indexByTag);
// Cadastro de perguntas
routes.post('/questions', QuestionController.create);
// Edição de perguntas
routes.put('/questions/:id', QuestionsController.update);

// Cadastro de respostas
routes.post('/answers', AnswerController.create);
// Edição de respostas
routes.put('/answers/:id', AnswerController.update);

// Cadastro de tags
routes.post('/tags', uploadImage.single('image'), TagController.create);
// Listagem de tags com filtro
routes.get('/tags', TagController.index);
// Listagem de todas as tags
routes.get('/tags/all', TagsController.indexTags);

module.exports = routes;