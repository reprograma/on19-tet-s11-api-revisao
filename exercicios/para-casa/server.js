const express = require('express')
const app = express()
const routes = require('./MVC/src/view/routes.js')

app.use(express.json)
app.use(routes)
app.listen(3030, ()=> {
    console.log('API está ouvindo na porta 3030')
})