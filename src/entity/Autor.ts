import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Genero from "./Genero"
import { Trabalho } from "./Trabalho";


@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  genero: Genero;

  @Column({length: 11})
  cpf: string
}
