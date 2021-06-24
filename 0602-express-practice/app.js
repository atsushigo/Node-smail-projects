const express = require('express')
const app = express()
const route = require("./router/index.js")

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(route);

app.listen('8001')
