const express = require('express');
const router = require('./src/routes/clientRoute');
const app = express();
const port = 3333;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`API is listening on ${port}`);
});
