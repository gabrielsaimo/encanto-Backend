import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapio } from './services/categoria-cardapio.entity';
import { CategoriaCardapioService } from './services/CategoriaCardapioService';
import { CategoriaCardapioController } from './categoria-cardapio/categoria-cardapio.controller';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([CategoriaCardapio]),
  ],
  controllers: [CategoriaCardapioController],
  providers: [CategoriaCardapioService],
})
export class AppModule {}