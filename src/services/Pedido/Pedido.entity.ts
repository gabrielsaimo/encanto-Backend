
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    created_at: string;

    @Column()
    desconto: number;

    @Column()
    mesa: number;

    @Column() 
    valor: number;

    @Column()
    obs: string;

    @Column()
    pedidos: string;

    @Column()
    created_by: string;

    @Column()
    update_by: string;

    @Column()
    acepted_by: string;

    @Column()
    acepted_at: string;

    @Column()
    finished_by: string;

    @Column()
    finished_at: string;
}