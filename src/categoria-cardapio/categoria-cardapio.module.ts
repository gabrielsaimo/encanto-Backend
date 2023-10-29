import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapioController } from './categoria-cardapio.controller';
import { CategoriaCardapioService } from '../services/Categoria/CategoriaCardapio.service';
import { CategoriaCardapio } from '../services/Categoria/categoria-cardapio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaCardapio])],
  controllers: [CategoriaCardapioController],
  providers: [CategoriaCardapioService],
})
export class CategoriaCardapioModule {}
