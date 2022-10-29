const express = require('express')
const app = express()
const rotas = require('./routes')
const port = 3333

app.use(express.json())
app.use(rotas)
app.listen(port, () => {
  console.log(`api rodando na porta ${port}`)
})
