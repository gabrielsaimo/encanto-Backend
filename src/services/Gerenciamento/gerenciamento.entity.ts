/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gerenciamento_entity {
  @PrimaryGeneratedColumn()
  id: number;
  

}
