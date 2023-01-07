const express = require("express");
const clientController = require("./controller/cliente");
const accountController = require("./controller/conta");
const routes = express.Router();

routes.post('/clients', clientController.createClients);
routes.patch('/clients/:id', clientController.updateClients);
routes.delete('/clients/:id', clientController.deleteClients);
routes.get('/clients/list', clientController.listALL);
routes.get('/clients', clientController.filterClients);
routes.get('/clients/:id', clientController.listClientsByID);

routes.patch('/clientes/:id/deposit', accountController.depositClient);
routes.patch('/clientes/:id/payment', accountController.clientPayments);


module.exports = routes