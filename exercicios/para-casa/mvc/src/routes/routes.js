const express = require ('express');
const clienteController = require("../controllers/clientesController")
const contaController = require("../controllers/conta")
const rotas  = express.Router();

rotas.post('/clientes/add',clienteController.novoCliente);
rotas.get('/clientes', clienteController.exibeCliente);
rotas.patch('/clientes/:idCliente/atualizar', clienteController.atualizaCliente);
rotas.delete('/clientes/:id', clienteController.deletaCliente);

rotas.patch('/clientes/:id/pagamento', contaController.realizaPagamento);
rotas.patch('/clientes/:id/deposito', contaController.realizaDeposito);

module.exports = rotas;