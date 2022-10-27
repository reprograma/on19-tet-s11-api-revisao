const express = require("express");
const clientesControllers = require("./src/controllers/clientes");
const contasControllers = require("./src/controllers/contas");
const routes = express.Router();

//cria cliente
routes.post("/conta/add" , clientesControllers.cria)

//filtra clientes
routes.get("/cliente", clientesControllers.filtra)

//atualiza infos
routes.patch("/clientes/atualiza/:id" , clientesControllers.atualizaUsuario)

//faz depósito
routes.patch("/clientes/:id/deposito", contasControllers.deposita)


//faz saque
routes.patch("/clientes/:id/saque", contasControllers.saca)

//deleta cliente
routes.delete("/clientes/:id", contasControllers.destroi)

module.exports = routes