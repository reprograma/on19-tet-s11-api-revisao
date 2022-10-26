const express = require('express')
const clienteController = require('./controller/cliente')
const contaController = require('./controller/conta')
const routes = express.Router()


routes.post('/bancos/adicionarClientes', clienteController.create)
routes.patch('/bancos/:id', clienteController.update)
routes.delete('/bancos/:id', contaController.destroy)
routes.get('/bancos', clienteController.index)



module.exports = routes