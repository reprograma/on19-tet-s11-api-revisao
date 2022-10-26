const express = require("express");
const clienteController = require("../controller/clientes");
const contasController = require("../controller/contas");
const routes = express.Router();

// - Atualizar telefone do cliente
routes.patch("/clientes/:id/atualizar", clienteController.updateTelefone);

// - Filtrar os clientes do banco pelo seu nome, nascimento e saldo
routes.get("/clientes/filtros", clienteController.show);

// - Criar conta do cliente no banco
routes.post("/conta/add", contasController.create);

// - Fazer depósitos na conta
routes.patch("/conta/:id/deposito", contasController.updateDeposito);

// - Fazer pagamentos na conta
routes.patch("/conta/:id/pagamento", contasController.updateDeposito);

// - Encerrar conta do cliente
routes.delete("/conta/:id/deletar", contasController.destroy);

module.exports = routes;
