import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cardapio } from 'src/services/cardapio.entity';
import { CategoriaCardapio } from 'src/services/categoria-cardapio.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING,
  host:
    process.env.POSTGRES_HOST ||
    'ep-curly-art-830376-pooler.us-east-2.postgres.vercel-storage.com',
  port: 5432,
  username: process.env.POSTGRES_USER || 'default',
  password: process.env.POSTGRES_PASSWORD || 'fh3sxIEMt5OX',
  database: process.env.POSTGRES_DATABASE || 'verceldb',
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
