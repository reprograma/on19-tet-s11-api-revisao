const express = require('express');
const contasClienteController = require("../controllers/contas-clienteController");

const router = express.Router();


router.post("/clientes/add", contasClienteController.adicionarCliente);
router.patch("/clientes/:id/deposito", contasClienteController.deposito);
router.patch("/clientes/:id/pagamento", contasClienteController.pagamento);
router.patch("/clientes/update/:id", contasClienteController.atualizarFoneEnd);
router.delete("/clientes/:id", contasClienteController.encerrarConta);
router.get("/clientes", contasClienteController.filtrarNomeCpf);


module.exports = router;
