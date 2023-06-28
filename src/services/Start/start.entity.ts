/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Start {
  @PrimaryGeneratedColumn()
  id: number;
}
