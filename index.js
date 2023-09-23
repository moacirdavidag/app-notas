const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

require('dotenv/config'); 

const port = process.env.PORT || 3000;
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}!`));