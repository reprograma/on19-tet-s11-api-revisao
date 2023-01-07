const express = require('express');
const app = express();
const routes = require('./src/routes')
const port = 3333;


app.use(express.json());

app.use(routes)


app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
    });