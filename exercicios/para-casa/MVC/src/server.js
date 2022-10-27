const express = require('express');
const app = express();
const routes = require('./view/routes');

app.use(express.json());
app.use(routes);


app.listen(3333, () => {
    console.log('The power of Suzik compels you on  port 3333')
})