const express = require ('express');
const app = express();
const rotas = require('./src/routes/routes')
const port = 1313

app.use(express.json());

app.use(rotas)

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});