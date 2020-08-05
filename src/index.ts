import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as dotenv from 'dotenv';

const app = express();

app.use(bodyParser.json());
app.use(routes);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins('*:*');

dotenv.config();
createConnection();

io.on('connection', (socket) => {
  console.log('conectado')
  socket.on('new-message', (message) => {
    console.log(message)
    socket.broadcast.emit('message-broadcast', message)
  });

});

server.listen(process.env.PORT || 3333);