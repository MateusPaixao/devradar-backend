const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http')

const routes = require('./routes')
const { setuWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app)

setuWebsocket(server)

mongoose.connect('mongodb+srv://mateus:12345@cluster0-ypoju.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json()) // vem antes das rotas
app.use(routes)

server.listen(3333);