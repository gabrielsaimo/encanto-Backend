/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aseetes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dados: string;

  @Column()
  tipo: string;

  @Column()
  idreq: number;
}
