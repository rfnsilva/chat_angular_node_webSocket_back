"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMensagem = exports.getMensagens = void 0;

var _typeorm = require("typeorm");

var _Mensagem = require("../entity/Mensagem");

var _Grupo = require("../entity/Grupo");

//retorna todas as mensagens
const getMensagens = async (req, res) => {
  try {
    const messages = await (0, _typeorm.getRepository)(_Mensagem.Mensagem).find({
      relations: ['user']
    });
    return res.json(messages);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar message'
    });
  }
}; //add mensagem


exports.getMensagens = getMensagens;

const addMensagem = async (req, res) => {
  const {
    mensagem,
    userId,
    grupoId,
    userName
  } = req.body;

  try {
    await (0, _typeorm.getRepository)(_Mensagem.Mensagem).query(`
      INSERT INTO "mensagem"("mensagem", "userId", "grupoId", "autor") VALUES ('${mensagem}', '${userId}', '${grupoId}', '${userName}')  RETURNING "id", "mensagem", "userId", "grupoId", "createdAt", "updatedAt"
    `);
    const grupo = await (0, _typeorm.getRepository)(_Grupo.Grupo).findOne({
      select: ['id', 'nome'],
      where: {
        id: grupoId
      },
      relations: ['mensagens']
    });
    return res.json(grupo);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add message'
    });
  }
};

exports.addMensagem = addMensagem;