const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const database = require('../database/connection');
const ValidateService = require('../services/ValidateService');

class UserController {

    async create(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        const data = {
            name,
            email,
            password,
            confirmPassword
        };

        // Função que realiza as validações dos campos.
        let isValid = await ValidateService.registerUser(data);

        if(isValid == false) {
            return res.status(400).json(ValidateService.errors);
        } else {
            
            try {
                
                // Gerando hash de senha para salvar no banco.
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);

                // inserindo dados do usuário no banco.
                let idUser = await database.insert({name, email, password: hash}).into('users');

                // selecionando usuário cadastrado para exibí-lo como resposta.
                let user = await database.select('*').table('users').where('id', idUser);
                user = user[0];

                // gerando token após o cadastro
                jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }, 'DJG@k#/JUj', {expiresIn: '24h'}, (error, token) => {
                    if(error) { 
                        return res.sendStatus(401);
                    } else {
                        return res.status(200).json({
                            token, 
                            id: user.id,
                            name: user.name, 
                            email: user.email
                        });
                    }
                });

            } catch(error) {
                console.log('Erro ao cadastrar: ' + error);
                return res.sendStatus(500);
            }

        }
    }

    async login(req, res) {
        let { email, password } = req.body;

        let data = { email, password };

        let response = await ValidateService.login(data);

        if(response == false) {
            return res.status(400).json(ValidateService.errors);
        } else {
            
            // Verificando se email existe no banco
            let user = await 
                database
                    .select('*')
                    .table('users')
                    .where('email', email);
                
            if(user.length > 0) {
                user = user[0]; // pegando apenas o unico objeto do array.
                // Comparando senha passada com hash do banco.
                let isCorrectPassword = bcrypt.compareSync(password, user.password);

                if(isCorrectPassword == true) {

                    // Gerando token de acesso ao sistema.
                    jwt.sign({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }, 'DJG@k#/JUj', { expiresIn: '24h' }, (error, token) => {
                        if(error) {
                            return res.sendStatus(401);
                        } else {
                            return res.status(200).json({
                                token,
                                id: user.id,
                                name: user.name,
                                email: user.email
                            });
                        }
                    });

                } else {
                    return res.status(401).json({error: 'E-mail e/ou senha incorreto(s)'});
                }

            } else {
                return res.status(401).json({error: 'E-mail e/ou senha incorreto(s)'});
            }

        }
    }

}

module.exports = new UserController;