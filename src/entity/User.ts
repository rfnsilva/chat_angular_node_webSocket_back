import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Mensagem } from './Mensagem';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @OneToMany(type => Mensagem, mensagem => mensagem.user)
  mensagens: Mensagem[];
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}