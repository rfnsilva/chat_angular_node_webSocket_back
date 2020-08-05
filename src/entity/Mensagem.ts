import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from './User';
import { Grupo } from './Grupo'

@Entity('mensagem')
export class Mensagem {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  autor: string;

  @Column("varchar")
  mensagem: string;

  @ManyToOne(type => User, user => user.mensagens)
  user: User;

  @ManyToOne(type => Grupo, grupo => grupo.mensagens)
  grupo: Grupo;
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}