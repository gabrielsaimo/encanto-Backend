/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Cardapio {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @IsBoolean()
  @Field(() => Boolean)
  active: boolean;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  category: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  price: number;

  @Column()
  @IsString()
  @Field(() => String)
  description: string;

  @Column()
  @IsString()
  @Field(() => String)
  sub: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  update_at: Date;

  @Column()
  @IsString()
  @Field(() => String)
  update_by: string;

  @Column()
  @IsString()
  imagem: string;

  @Column()
  @IsBoolean()
  @Field(() => Boolean)
  meia: boolean;

  @Column()
  @IsBoolean()
  @Field(() => Boolean)
  highlight: boolean;
}
