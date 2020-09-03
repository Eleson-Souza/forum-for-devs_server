const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

// Config
// CORS
app.use(cors());

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));

// Utilização das rotas
app.use(routes);

const port = '3333';
app.listen(port, () => {
    console.log('Aplicação rodando na porta ' + port);
});