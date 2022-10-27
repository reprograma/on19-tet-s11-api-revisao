const express = require('express')
const routes = express.Router();
const ClienteController = require('./controller/cliente')
const ClienteConta = require('./controller/conta')

routes.post('/clientes', ClienteController.create);
routes.get('/filter', ClienteController.read)
routes.delete('/clientes/:cpf_cliente', ClienteController.destroy);
module.exports =routes;