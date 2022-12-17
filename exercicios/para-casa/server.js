const express = require("express");
const routes = require('../src/router/routes');
const app = express();


app.use(express.json());
app.use(routes);
app.listen(3030, () => {
    console.log(`API rodando na porta 3030`)
});