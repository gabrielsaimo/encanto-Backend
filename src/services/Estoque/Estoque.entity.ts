/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nm_produto: string;

  @Column()
  ds_produto: string;

  @Column()
  tp_produto: string;

  @Column()
  qtd_produto: number;

  @Column()
  price: number;

  @Column()
  tp_peso: string;

  @Column()
  validade: Date;

  @Column()
  updated_at: Date;
}