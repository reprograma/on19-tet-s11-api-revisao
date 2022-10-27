const express = require('express')
const app = express();
const port = 3333
const routes = require('./src/routes')
app.use(express.json())
app.use(routes)


app.listen(port,()=>{
    console.log(`Api esta rodando na porta ${port}`);
  })