const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

const app = express();

mongoose.connect('mongodb+srv://mateus:12345@cluster0-ypoju.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json()) // vem antes das rotas
app.use(routes)

app.listen(3333);