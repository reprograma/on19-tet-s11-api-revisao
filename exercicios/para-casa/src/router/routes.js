const express = require("express");
const clienteController = require("../controller/clientes");
const contasController = require("../controller/contas");
const routes = express.Router();

routes.post("/conta/add", contasController.newCreate);
routes.patch("/conta/:id/deposito", contasController.newDeposito);
routes.patch("/conta/:id/pagamento", contasController.newDeposito);
routes.delete("/conta/:id/deletar", contasController.destroy);
routes.patch("/clientes/:id/atualizar", clienteController.updateTelefone);
routes.get("/clientes/filtros", clienteController.show);


module.exports = routes;