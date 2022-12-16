const express = require("express");
const cors = require("cors");
const clienteRoutes = require("../para-casa/src/Routes/clienteRoutes");
const app = express();
const port = 3333;



app.use(express.json());
app.use(cors());
app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
  });

app.use("/", clienteRoutes);


module.exports = app ;