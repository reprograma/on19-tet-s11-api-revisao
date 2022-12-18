const express = require('express'); //instancia o express
const app = express(); 
//const {v4: uuidv4 } = require("uuid");
const port = 3333;
const contasClientes = require('./model/contasClientes.json');


app.use(express.json());

//- Criar os clientes de um banco (POST)

//- Atualizar informações desses clientes ( como endereço, telefone de contato...)



app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
});