const express = require('express')
const cliente = require('../controller/cliente')
const conta = require('../controller/conta')
const routes = express.Router()


routes.post('/clientes/add', cliente.novoCliente)

routes.patch("/clientes/:id", cliente.atualizarCliente)
routes.patch("/conta/:id/deposito", conta.deposito)
routes.patch("/conta/:id/pagamento", conta.pagamento)

routes.delete("/clientes/:id", cliente.excluirCliente)

routes.get("/clientes", cliente.findCostumer)

module.exports = routes