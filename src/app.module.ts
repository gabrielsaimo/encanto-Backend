import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapio } from './services/categoria-cardapio.entity';
import { CategoriaCardapioService } from './services/CategoriaCardapioService';
import { CategoriaCardapioController } from './categoria-cardapio/categoria-cardapio.controller';
import { databaseConfig } from './config/database.config';
import { Cardapio } from './services/cardapio.entity';
import { CardapioController } from './cardapio/cardapio.controller';
import { CardapioService } from './services/CardapioService';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cardapio, CategoriaCardapio]),
  ],
  controllers: [CategoriaCardapioController, CardapioController],
  providers: [CategoriaCardapioService, CardapioService],
})
export class AppModule {}
