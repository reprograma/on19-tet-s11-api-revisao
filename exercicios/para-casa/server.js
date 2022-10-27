const express = require("express");
const app = express();
const router = require("./src/routes/contas-clientesRoutes");
const port = 3333;

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
