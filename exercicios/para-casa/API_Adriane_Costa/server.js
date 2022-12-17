const express = require("express");
const routes = require("./src/routes");
const app = express();
const port = 3030;

app.use(express.json());
app.use(routes)

app.listen(port, () => {
    console.log(`API escutando na porta ${port}`)
})