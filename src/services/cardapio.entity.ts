import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cardapio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  sub: string;
}
