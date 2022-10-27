const express = require("express")
const routes = require("./routes")
const app = express()
const listaDeClientes = require("../para-casa/src/models/contas-clientes.json")

app.use(express.json())


app.use(routes)


app.listen(3000,()=>{
console.log("API esta na porta 3000")
})