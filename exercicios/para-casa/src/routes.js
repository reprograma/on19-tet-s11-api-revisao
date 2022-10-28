const express = require("express");
const clienteController = require("./controller/cliente");
const contaController = require("./controller/conta");
const routes = express.Router();

routes.post('/clientes', clienteController.criarClientes);
routes.patch('/clientes/:id', clienteController.atualizarClientes);
routes.delete('/clientes/:id', clienteController.deletarClientes);
routes.get('/clientes/lista', clienteController.listarTodos);
routes.get('/clientes', clienteController.filtrarClientes);
routes.get('/clientes/:id', clienteController.listarClientesPorID);

routes.patch('/clientes/:id/deposito', contaController.depositoCliente);
routes.patch('/clientes/:id/pagamento', contaController.pagamentoCliente);


module.exports = routes