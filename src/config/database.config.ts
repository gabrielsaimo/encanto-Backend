/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cardapio } from 'src/services/cardapio.entity';
import { CategoriaCardapio } from 'src/services/categoria-cardapio.entity';
import * as dotenv from 'dotenv';
 dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING,
  host:
    process.env.POSTGRES_HOST ,
  port: 5432,
  username: process.env.POSTGRES_USER ,
  password: process.env.POSTGRES_PASSWORD ,
  database: process.env.POSTGRES_DATABASE ,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
    Cardapio,
    CategoriaCardapio,
  ],
  synchronize: true, // Defina como false em produção
  ssl: {
    rejectUnauthorized: false,
  },
};
