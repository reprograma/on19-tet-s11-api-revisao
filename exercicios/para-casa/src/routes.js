const {Router} = require('express');
const clientesController = require('./controllers/users');
const contasController = require('./controllers/contas');
const router = Router();

router.get('/clientes', clientesController.mostrar)
router.get('/consultas', clientesController.filtrar)
router.get('/contas', contasController.agruparContas)
router.put('/atualiza/:id', clientesController.alteraCadastro)
router.post('/nova/conta', contasController.criarConta )
router.patch("/clientes/:id", clientesController.atualizaParcial)
router.patch("/depositos", contasController.deposito)
router.patch("/saque", contasController.saque)
router.delete("/exclui/conta", contasController.excluiConta)


module.exports = router