const express = require('express')
const routes = express.Router()
const clienteController = require("./src/controllers/cliente")

routes.patch("/clientes/atualizar/:id", clienteController.update)

module.exports = routes