/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriaCardapio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  active: boolean;

  @Column()
  @IsString()
  name: string;
}
