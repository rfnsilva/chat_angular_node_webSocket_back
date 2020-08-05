import {Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, CreateDateColumn, OneToMany } from "typeorm";
import { User } from './User';
import { Mensagem } from './Mensagem'

@Entity('grupo')
export class Grupo {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @OneToMany(type => Mensagem, mensagem => mensagem.grupo)
  mensagens: Mensagem[];

  @ManyToMany(type => User)
  @JoinTable()
  users: User[];
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}