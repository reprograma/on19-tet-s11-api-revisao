const express = require('express')
const clienteController = require('./controller/cliente')
const contaController = require('./controller/conta')
const routes = express.Router()

routes.post('/clientes/add', clienteController.adicionaCliente)
routes.get('/clientes/:id', clienteController.listaCliente)
routes.get('/clientes', clienteController.listaClientes)
routes.patch('/clientes/:id/atualizar', clienteController.atualizaCliente)
routes.delete('/clientes/:id', clienteController.deletaCliente)
routes.patch('/clientes/:id/pagamento', contaController.efetuaPagamento)
routes.patch('/clientes/:id/deposito', contaController.efetuaDeposito)

module.exports = routes
