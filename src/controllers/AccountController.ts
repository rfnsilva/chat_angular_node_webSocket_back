import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const saveUser = async (req: Request, res: Response) => {
    
    const { nome, email, password } = req.body;

    try {
        const senhaHash = await bcrypt.hash(password, 8);
        
        const user = await getRepository(User).save({
            nome,
            email,
            password: senhaHash
        });
        
        const token_register = jwt.sign({ nome }, process.env.SECRET, {
            expiresIn: '1d'
        });

        const data = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token: token_register
        }
        
        return res.status(201).json(data);

    } catch (error) {
        return res.status(402).json({message: "erro user controller"})
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const user = await getRepository(User).findOne({
            where: {
                email
            }
        });
        
        if (await bcrypt.compare(password, user.password)) {
            const token_login = jwt.sign({ email }, process.env.SECRET, {
                expiresIn: '1d'
            });

            const data = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                token: token_login
            }
            
            return res.json(data);
        } else {
            return res.status(404).json({messge: "erro no login controler"})
        }

    } catch (err) {
        return res.status(402).json({message: "erro user controller"})
    }
}
