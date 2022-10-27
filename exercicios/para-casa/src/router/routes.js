const express = require("express")
const clienteController = require("../controller/clientes")
const contasController = require("../controller/contas")
const routes = express.Router()


//- Criar os clientes do banco
routes.post("/clientes/add", contasController.create),

//- Atualizar informações desses clientes ( como endereço, telefone de contato...)
routes.put("/clientes/:id", clienteController.updateDados),

 //depositar usando saldo da conta
routes.patch("/deposito", contasController.updateDeposito),

  //fazer pagamento usando saldo da conta
routes.patch("/pagamentos", contasController.updatePagamento),

//- Encerrar contas de clientes
routes.delete("/clientes/:id", contasController.destroy),

//- Conseguir Filtrar os clientes do banco pelo seu nome,por saldo 
routes.get("/clientes", clienteController.show),

module.exports = routes