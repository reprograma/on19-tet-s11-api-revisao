const express = require ('express');
const app = express();
const rotas = require('./src/routes')
const port = 3000

app.use(express.json());

app.use(rotas)

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});