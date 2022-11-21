const controller = require('../controller/clientsController');
const balanceController = require('../controller/balanceController');
const express = require('express');
const router = express.Router();

router.post("/clients/add", controller.addNewClient);
router.put("/clients/:id", controller.updatedClient);
router.patch("/clients/payment/:id", balanceController.payment);
router.patch("/clients/deposit/:id", balanceController.deposit);
router.delete("/clients/:id", controller.deleteClient);
router.get("/clients", controller.filterClient);

module.exports = router;

