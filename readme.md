# API Forum For Devs

Esta API é utilizada para criação e/ou busca de perguntas, respostas, tags e usuários para consumo dos dados em uma [aplicação web React](https://github.com/Eleson-Souza/forum-for-devs_web).

## Alguns endpoints

### POST /users
Esse endpoint é responsável pela criação de um novo usuário no banco de dados.

#### Parâmetros
**name**: Nome do usuário que está se cadastrando.

**email**: E-mail do usuário que está se cadastrando.

**password**: Senha do usuário para acessar o sistema.

**confirmPassword**: Confirmação de senha do usuário.

#### Respostas
##### Requisição inválida! 400
Caso essa resposta aconteça, significa que algum(ns) dos campos obrigatórios não foram informados ou foram informados de forma incorreta.

Exemplo de resposta:
```
{
    "name": "O campo Nome é de preenchimento obrigatório!",
    "email": "Este endereço de e-mail é inválido!"
}
```

##### Não autorizado! 401
Caso essa resposta aconteça, houve algum problema ao gerar o token de acesso.
Exemplo de resposta:
```
{
    "status": "Bad request"
}
```

##### OK! 400
Caso essa resposta apareça, o usuário foi cadastrado com sucesso e será retornado seus dados, inclusive um token de acesso.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Ik1hcmlhIEVkdWFyZGEiLCJlbWFpbCI6Im1hcmlhZWR1YXJkYUBnbWFpbC5jb20iLCJpYXQiOjE1OTk1MjU4NjQsImV4cCI6MTU5OTYxMjI2NH0.HY4uPZ3asGIvQsLnjE7y-XNVLjQP36Lco41tl3DzFTI",
    "id": 5,
    "name": "Maria Eduarda",
    "email": "mariaeduarda@gmail.com"
}
```

### POST /login?search=""&classification=creation_date&order=""
Esse endpoint é responsável por listar todas as perguntas registradas no banco de dados (quando passado apenas com "/login"). Ou com query params para filtrar por resultados específicos.

#### Parâmetros
**search**: Busca por texto no título ou descrição da pergunta.

**classification**: Forma de ordenação das perguntas na exibição. São quatro possibilidades:
* **creation_date**: Data da criação da pergunta (padrão)
* **quant_answers**: Quantidade de respostas da pergunta.
* **quant-likes**: Quantidade de curtidas da pergunta.
* **name**: Nome do título da pergunta.

**order**: Tipo de ordenação das perguntas na exibição. São duas possibilidades:
* **desc**: Ordem descrescente (padrão)
* **asc**: Ordem crescente

#### Respostas
##### OK! 400
Caso essa resposta apareça, as perguntas serão exibidas de acordo com os filtros requisitados.

Exemplo de resposta:
```
[
    {
        "id": 146,
        "title": "O que é Flutter?",
        "body": "<p>Gostaria de saber o que &eacute; Flutter, onde ele &eacute; aplicado?</p>",
        "creation_date": "2020-09-07T16:28:50.000Z",
        "quant_answers": 0,
        "quant_likes": 0,
        "users_id": 3,
        "tags": [
            "flutter"
        ]
    },
    {
        "id": 145,
        "title": "Software para criar Diagramas de Classe",
        "body": "<p>Gostaria de saber quais softwares usados ou se existe algum site online para criar diagramas de classes, algu&eacute;m poderia me indicar?</p>",
        "creation_date": "2020-08-30T21:58:18.000Z",
        "quant_answers": 1,
        "quant_likes": 0,
        "users_id": 1,
        "tags": [
            "uml"
        ]
    },
]
```
