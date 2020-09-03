const database = require('../database/connection');
const validator = require('validator');

class ValidateService {

    constructor() {
        this.errors = {}; // atributo que adicionará erros.
        this.arrayTags = []; // atributo de array que guardará as tags.
    }

    // função de validação do usuário.
    async registerUser(data) {
        // Resetando erros
        this.errors = {};

        let { name, email, password, confirmPassword } = data;

        if(!name) {
            this.errors.name = "O campo Nome é de preenchimento obrigatório!";
        } else if(name.length < 6) {
            this.errors.name = "Esse nome é muito pequeno, por favor informe ao menos nome e sobrenome";
        }

        if(!email) {
            this.errors.email = "O campo E-mail é de preenchimento obrigatório!";
        } else if(validator.isEmail(email) == false) {
            this.errors.email = "Este endereço de e-mail é inválido!";
        }

        if(!password) {
            this.errors.password = "O campo Senha é de preenchimento obrigatório!";
        } else if (!confirmPassword) {
            this.errors.confirmPassword = "O campo Confirmar Senha é de preenchimento obrigatório!";
        } else if(password != confirmPassword) {
            this.errors.password = "Os campos de Senha não são correspondentes!";
        }

        // Se o objeto errors tiver algum atributo de erro, retorna falso.
        if(this.errors.name || this.errors.email || 
            this.errors.password || this.errors.confirmPassword) {
            return false;
        } else {
            // Verificando se email já existe no banco.
            let data = await database
            .select('*').table('users').where('email', email);

            if(data.length > 0) {
                this.errors.email = 'O e-mail informado já existe na base de dados!';

                return false;
            }
            
            return true;
        }
    }

    // validações de login
    login(data) {
        // Resetando erros
        this.errors = {};

        let { email, password } = data;

        // E-mail
        if(!email) {
            this.errors.email = 'Digite o e-mail!';
        } else if(validator.isEmail(email) == false) {
            this.errors.email = 'Digite um e-mail válido!';
        }

        // Senha
        if(!password) {
            this.errors.password = 'Digite uma senha!';
        }

        // retornando verdadeiro ou falso, se existir ou não erros.
        if(this.errors.email || this.errors.password) {
            return false;
        } else {
            return true;
        }
    }

    // validação do cadastro de perguntas
    registerQuestion(data) {
        // Resentando errors
        this.errors = {};

        let { title, body, tags } = data;

        // Título
        if(!title) {
            this.errors.title = 'O campo Título é de preenchimento obrigatório!';
        } else if(title.length < 15) {
            this.errors.title = 'O campo Título deve ter, no mínimo, 15 caracteres.'
        }

        // Corpo
        if(!body) {
            this.errors.body = 'O campo Corpo é de preenchimento obrigatório!';
        } else if(body.length < 30) {
            this.errors.body = 'O campo Corpo deve ter, no mínimo, 30 caracteres.';
        }

        // Tags
        /* if(tags.length == 0) {
            this.errors.tags = 'O campo Tags deve ter, no mínimo, 1 tag.';
        } */

        if(this.errors.title || this.errors.body) {
            return false;
        } else {
            return true;
        }
    }

    // validação do cadastro de respostas.
    registerAnswers(descript) {
        // Resentando errors
        this.errors = {};

        if(!descript) {
            this.errors.description = 'O campo Descrição não tem nenhum conteúdo!';
        }

        if(this.errors.description) {
            return false;
        } else {
            return true;
        }
    }

    registerTags(data) {
        // Resentando errors
        this.errors = {};

        let { name, image, description } = data;

        if(!name) {
            this.errors.name = 'O campo Tag é de preenchimento obrigatório';
        }

        if(!description) {
            this.errors.description = 'O campo Descrição é de preenchimento obrigatório!';
        }

        if(this.errors.name || this.errors.description) {
            return false;
        } else {
            return true;
        }
    }

    // Formatação da data (DD-MM-YYYY HH-MM-SS)
    formatDate(date) {
        let day, month, year, hours, minutes, seconds;
        
        day = date.getDate();        
        day = (day < 10) ? `0${day}` : day;
        month = (date.getMonth() + 1);
        month = (month < 10) ? `0${month}` : month;
        year = date.getFullYear();
        hours = date.getHours();
        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = date.getMinutes();
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = date.getSeconds();
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

}

module.exports = new ValidateService;