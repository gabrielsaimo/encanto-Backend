/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Cliente_entity {
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
  @PrimaryColumn()
  phone: number;
}
