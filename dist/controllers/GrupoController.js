"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGrupo = exports.getGrupo = exports.getGrupos = void 0;

var _typeorm = require("typeorm");

var _Grupo = require("../entity/Grupo");

//retorna todos os grupos
const getGrupos = async (req, res) => {
  try {
    const grupos = await (0, _typeorm.getRepository)(_Grupo.Grupo).find();
    console.log(grupos);
    return res.json(grupos);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar grupos'
    });
  }
}; //retorna um grupo


exports.getGrupos = getGrupos;

const getGrupo = async (req, res) => {
  try {
    const id = req.params.id;
    const grupo = await (0, _typeorm.getRepository)(_Grupo.Grupo).findOne({
      select: ['id', 'nome'],
      where: {
        id
      },
      relations: ['mensagens']
    });
    return res.json(grupo);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar grupo'
    });
  }
}; //add grupo


exports.getGrupo = getGrupo;

const addGrupo = async (req, res) => {
  const {
    nome
  } = req.body;

  try {
    const grupo = await (0, _typeorm.getRepository)(_Grupo.Grupo).query(`
      INSERT INTO "grupo"("nome") VALUES ('${nome}')  RETURNING "id", "nome", "createdAt", "updatedAt"
    `);
    return res.json(grupo);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add grupo'
    });
  }
};

exports.addGrupo = addGrupo;