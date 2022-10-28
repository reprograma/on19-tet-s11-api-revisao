const express = require('express');
const routes = require('./mvc/src/routes')
const app = express();
const port = 3003
app.use(express.json());
app.use(routes);


app.listen (port, () => {
    console.log(`Api está rodando na porta ${port}`)
} )
