const express = require('express');
const app = express();
const port = 3333;
const routes = require('./routes')
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});