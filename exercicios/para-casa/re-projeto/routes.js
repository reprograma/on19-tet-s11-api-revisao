const {Router} = require('express');
const router = Router();
const controleClientes = require('./controllers/clientes');
const controleSaldo = require('./controllers/saldo')

router.post('/clientes/criar', controleClientes.criaCliente);
router.patch('/clientes/alterar/:id', controleClientes.atualizaCliente);
router.delete('/clientes/encerrar/:id', controleClientes.encerraCliente);
router.get('/clientes', controleClientes.listarClientes);
router.patch('/clientes/pagamento/:id', controleSaldo.pagamento);
router.patch('/clientes/deposito/:id', controleSaldo.deposito);

module.exports = router