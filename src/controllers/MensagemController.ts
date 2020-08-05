import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Mensagem } from '../entity/Mensagem';
import { Grupo } from '../entity/Grupo';


//retorna todas as mensagens
export const getMensagens = async(req: Request, res: Response) => {
  try {

    const messages = await getRepository(Mensagem).find({
      relations: ['user']
    });

    return res.json(messages);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar message' })
  }
}


//add mensagem
export const addMensagem = async (req: Request, res: Response) => {
  const { mensagem, userId, grupoId, userName } = req.body;

  try {

    await getRepository(Mensagem).query(`
      INSERT INTO "mensagem"("mensagem", "userId", "grupoId", "autor") VALUES ('${mensagem}', '${userId}', '${grupoId}', '${userName}')  RETURNING "id", "mensagem", "userId", "grupoId", "createdAt", "updatedAt"
    `);

    const grupo = await getRepository(Grupo).findOne({
      select: ['id', 'nome'],
      where: {
        id: grupoId
      },
      relations: ['mensagens']
    });

    return res.json(grupo);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add message' })
  }
}
