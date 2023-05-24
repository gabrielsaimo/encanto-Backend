import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapioController } from './categoria-cardapio.controller';
import { CategoriaCardapioService } from '../services/CategoriaCardapioService';
import { CategoriaCardapio } from '../services/categoria-cardapio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaCardapio])],
  controllers: [CategoriaCardapioController],
  providers: [CategoriaCardapioService],
})
export class CategoriaCardapioModule {}
