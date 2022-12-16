const controller = require("../Controller/clienteController");
const express = require('express');
const router = express.Router();

router.get("/filter/:id", controller.recebeUltimoID);

router.get("/consultas/:id", controller.recebeUltimoIDConsultas);

app.patch('/clientes/consulta/id', controller.novaConsulta);

app.patch('/clientes/:idCliente/consulta/:idConsulta', controller.atualizaConsulta);

app.post('/clientes/add', controller.addCliente);

app.patch('/clientes/:id', controller.updateCliente);

app.get('/clientes/consultas/:id', controller.consultaId);


module.exports = router;