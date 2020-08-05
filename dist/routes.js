"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AccountController = require("./controllers/AccountController");

var _UserController = require("./controllers/UserController");

var _GrupoController = require("./controllers/GrupoController");

var _MensagemController = require("./controllers/MensagemController");

var _cors = _interopRequireDefault(require("cors"));

var _auth = require("./middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use((0, _cors.default)());
routes.get('/', (request, response) => {
  return response.json({
    message: "PRONTO CARALHOOOOO !"
  });
});
routes.post('/register', _AccountController.saveUser);
routes.post('/login', _AccountController.login); //middleware autenticacao

routes.use(_auth.auth);
routes.get('/user/:id', _UserController.getUser);
routes.get('/grupos', _GrupoController.getGrupos);
routes.post('/add_grupo', _GrupoController.addGrupo);
routes.get('/grupo/:id', _GrupoController.getGrupo);
routes.get('/mensagens', _MensagemController.getMensagens);
routes.post('/add_mensagem', _MensagemController.addMensagem);
var _default = routes;
exports.default = _default;