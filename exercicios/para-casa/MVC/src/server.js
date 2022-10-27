const express = require('express')
const app = express()
app.use(express.json())
const routes = require('./routes')

app.use(express.json())
app.use(routes)
app.listen(3000, () => {
  console.log(`api rodando na porta 3000`)
})

