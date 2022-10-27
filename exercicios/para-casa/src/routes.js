const express = require('express')
const cliente = require('../src/controller/cliente')
const conta = require('../src/controller/conta')
const routes = express.Router()


routes.post('/clientes/add', cliente.newCostumer)
routes.patch("/clientes/:id", cliente.updateCostumer)
routes.patch("/conta/:id/deposito", conta.bankDeposit)
routes.patch("/conta/:id/pagamento", conta.bankPayment)
routes.delete("/clientes/:id", cliente.deleteCostumer)
routes.get("/clientes", cliente.findCostumer)
module.exports = routes
