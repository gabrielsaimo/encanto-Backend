/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cardapio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsBoolean()
  active: boolean;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  sub: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  update_at: Date;

  @Column()
  @IsString()
  update_by: string;

  @Column()
  imagem: string;

  @Column()
  @IsBoolean()
  meia: boolean;

  @Column()
  @IsBoolean()
  highlight: boolean;
}
