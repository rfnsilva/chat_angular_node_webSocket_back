"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _typeorm = require("typeorm");

var _User = require("../entity/User");

//retorna todos os usuarios
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await (0, _typeorm.getRepository)(_User.User).find({
      select: ['id', 'nome', 'email'],
      where: {
        id
      },
      relations: ['mensagens']
    });
    return res.json(user);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar getHome'
    });
  }
};

exports.getUser = getUser;