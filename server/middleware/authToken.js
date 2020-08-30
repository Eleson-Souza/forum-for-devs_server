const jwt = require('jsonwebtoken');

function authByToken(req, res, next) {
    var token = req.headers['authorization'];
    
    if(token) {
        token = token.split(' ')[1];

        jwt.verify(token, 'DJG@k#/JUj', (error, data) => {
            if(error) {
                return res.status(401).json({error: 'Token inválido!'});
            } else {
                req.token = token;
                req.userLogged = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                res.status(200);
                next();
            }
        });

    } else {
        return res.status(401).json({error: 'Token vazio!'});
    }
}

module.exports = authByToken;