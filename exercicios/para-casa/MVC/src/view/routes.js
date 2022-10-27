const express = require('express');
const clientControl = require('../Controller/contas')
const routes = express.Router();

routes.post('/newclient', clientControl.createClient);

routes.get('/findclient', clientControl.findClient);

routes.patch('/update/:id', clientControl.updateClient);

routes.delete('/deleteclient', clientControl.destroyClient)

module.exports = routes;

