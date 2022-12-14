const express = require('express');
const clienteController = require('../controller/cliente.js')
const routes = express.Router();

routes.post('/clientes', clienteController.criarCliente);
routes.patch('/editarClientes', clienteController.editar);
routes.get('/editarClientes', clienteController.ler);
routes.delete('/excluirCliente', clienteController.deletar);

module.exports = routes

