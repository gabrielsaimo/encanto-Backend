/* eslint-disable prettier/prettier */
import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateCardapioInput {
  @IsNumber()
  id: number;

  @IsBoolean()
  active: boolean;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  @IsString()
  sub: string;

  @IsNotEmpty()
  @IsDate()
  update_at: Date;

  @IsString()
  update_by: string;

  @IsString()
  imagem: string;

  @IsBoolean()
  meia: boolean;

  @IsBoolean()
  highlight: boolean;
}
