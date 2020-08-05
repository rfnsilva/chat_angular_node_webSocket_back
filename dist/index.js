"use strict";

require("reflect-metadata");

var _typeorm = require("typeorm");

var _express = _interopRequireDefault(require("express"));

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(bodyParser.json());
app.use(_routes.default);

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.origins('*:*');
dotenv.config();
(0, _typeorm.createConnection)();
console.log('aqui 1');
io.on('connection', socket => {
  socket.on('new-message', message => {
    socket.broadcast.emit('message-broadcast', message);
  });
});
server.listen(process.env.PORT);