const express = require('express')
const routes = express.Router()
const clienteController = require('./controller/cliente') 
const contaController = require('./controller/conta')

//rotas do cliente
routes.post("/clientes/add", clienteController.create)
routes.patch("/clientes/atualizar/:id", clienteController.update)
routes.delete("/clientes/:id", clienteController.destroy)
routes.get("/clientes", clienteController.read)
//rotas da conta
routes.patch("/clientes/pagamento/:id", contaController.payment)
routes.patch("/clientes/deposito/:id", contaController.deposit)

module.exports = routes