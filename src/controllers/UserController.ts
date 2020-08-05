import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';

//retorna todos os usuarios
export const getUser = async(req: Request, res: Response) => {
    try {
        
      const id  = req.params.id;
    
      const user = await getRepository(User).find({
          select: ['id', 'nome', 'email'],
          where: {
              id
          },
          relations: ['mensagens']
      });

      return res.json(user);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar getHome' })
    }
}
