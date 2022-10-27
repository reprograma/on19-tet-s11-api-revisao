const { Router } = require("express");
const clientController = require("./controllers/client");
const accountController = require("./controllers/account")
const routes = Router();

routes.post("/clients/addBankAccount", clientController.create);
routes.get("/clients", clientController.read);
routes.patch("/clients/updatedata/:id", clientController.update);
routes.delete("/clients/addBankAccount/:id", clientController.destroy);
routes.patch("/clients/update/:id", accountController.updateAccountType);
routes.patch("/clients/banktransaction/:cpf", accountController.updateBankBalance);

module.exports = routes