import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Grupo } from '../entity/Grupo';


//retorna todos os grupos
export const getGrupos = async(req: Request, res: Response) => {
  try {

    const grupos = await getRepository(Grupo).find();

    return res.json(grupos);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar grupos' })
  }
}

//retorna um grupo
export const getGrupo = async(req: Request, res: Response) => {
  try {
    const id  = req.params.id;

    const grupo = await getRepository(Grupo).findOne({
      select: ['id', 'nome'],
      where: {
          id
      },
      relations: ['mensagens']
    });

    return res.json(grupo);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar grupo' })
  }
}

//add grupo
export const addGrupo = async (req: Request, res: Response) => {
  const { nome } = req.body;

  try {

    const grupo = await getRepository(Grupo).query(`
      INSERT INTO "grupo"("nome") VALUES ('${nome}')  RETURNING "id", "nome", "createdAt", "updatedAt"
    `);

    return res.json(grupo);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add grupo' })
  }
}
