const express = require("express")
const controllerCliente = require("../controller/clientes")
const controllerContas = require("../controller/contas")
const routes = express.Router()

routes.post("/cliente/add", controllerCliente.create)


routes.put("/cliente/:id", controllerCliente.updateDadosCliente) 

routes.patch("/cliente/:id", controllerContas.updateSaldo)

routes.delete("/cliente/:nome", controllerContas.destroy)

routes.get("/cliente/:cpf", controllerCliente.show)



module.exports = routes