/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pagamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  idpedido: number;

  @Column()
  created_by: string;

  @Column()
  created_at: string;

  @Column()
  valor: number;

  @Column()
  obs_cancel: string;
}
