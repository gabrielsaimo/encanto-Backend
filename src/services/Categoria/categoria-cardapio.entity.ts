/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriaCardapio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  name: string;
}