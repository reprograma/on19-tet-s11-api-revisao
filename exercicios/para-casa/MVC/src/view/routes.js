const express = require('express')
const clienteController = require('../Controller/cliente')
const contaController = require('../Controller/conta')
const routes = express.Router()

routes.post('/clientes', clienteController.create)
routes.get('/contas-clientes', clienteController.index)// buscas na query
routes.get('/contas-clientes/:id', clienteController.indexID)// buscas por params
routes.delete("/contas-clientes/:id", clienteController.destroy)
routes.patch('/contas-clientes/:id/saque', contaController.update)
routes.patch('/contas-clientes/:id', clienteController.update)

module.exports = routes