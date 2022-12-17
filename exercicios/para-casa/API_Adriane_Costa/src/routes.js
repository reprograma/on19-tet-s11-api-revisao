const { Router } = require("express");
const clientController = require("./controllers/client");
const accountController = require("./controllers/account")
const routes = Router();

routes.post("/clients/addBankAccount", clientController.create);
routes.get("/clients", clientController.read);
routes.patch("/clients/updateBirthday/:id", clientController.update);
routes.delete("/clients/deleteBankAccount/:id", clientController.destroy);
routes.patch("/clients/updateAccountType/:id", accountController.updateAccountType);
routes.patch("/clients/banktransaction/:id", accountController.updateBankBalance);

module.exports = routes