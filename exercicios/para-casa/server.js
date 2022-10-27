const express = require("express")
const routes = require("./src/routes/routes")
const app = express()



app.use(express.json())
app.use(routes)
app.listen(3333, ()=>{
    console.log(`Aplicação rodando na porta : 3333`)

})