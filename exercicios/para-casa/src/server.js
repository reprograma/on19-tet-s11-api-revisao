const express = require('express');
const router = require('./routes');
const app = express();
const port = 3030;



app.use(express.json());
app.use(router);



app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
  });