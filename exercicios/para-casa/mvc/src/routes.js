const express = require('express');
const clienteController = require("./controllers/clientes")
const contaController = require("./controllers/contas")
const routes = express.Router();

routes.post("/contas/add", clienteController.criarConta);
routes.patch("/contas/:id", clienteController.atualizarCliente);
routes.delete("/contas/:conta", clienteController.deletarCliente);
routes.get("/contas", clienteController.mostrarClientes);
routes.patch("/conta/deposito", contaController.deposito);
routes.patch("/conta/pagamento", contaController.pagamento);

module.exports =  routes