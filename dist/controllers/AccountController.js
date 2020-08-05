"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.saveUser = void 0;

var _typeorm = require("typeorm");

var _User = require("../entity/User");

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var bcrypt = _interopRequireWildcard(require("bcrypt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const saveUser = async (req, res) => {
  const {
    nome,
    email,
    password
  } = req.body;

  try {
    const senhaHash = await bcrypt.hash(password, 8);
    const user = await (0, _typeorm.getRepository)(_User.User).save({
      nome,
      email,
      password: senhaHash
    });
    const token_register = jwt.sign({
      nome
    }, process.env.SECRET, {
      expiresIn: '1d'
    });
    const data = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: token_register
    };
    return res.status(201).json(data);
  } catch (error) {
    return res.status(402).json({
      message: "erro user controller"
    });
  }
};

exports.saveUser = saveUser;

const login = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    const user = await (0, _typeorm.getRepository)(_User.User).findOne({
      where: {
        email
      }
    });

    if (await bcrypt.compare(password, user.password)) {
      const token_login = jwt.sign({
        email
      }, process.env.SECRET, {
        expiresIn: '1d'
      });
      const data = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        token: token_login
      };
      return res.json(data);
    } else {
      return res.status(404).json({
        messge: "erro no login controler"
      });
    }
  } catch (err) {
    return res.status(402).json({
      message: "erro user controller"
    });
  }
};

exports.login = login;