import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapio } from './services/Categoria/categoria-cardapio.entity';
import { CategoriaCardapioService } from './services/Categoria/CategoriaCardapioService';
import { CategoriaCardapioController } from './categoria-cardapio/categoria-cardapio.controller';
import { databaseConfig } from './config/database.config';
import { Cardapio } from './services/Cardapio/cardapio.entity';
import { CardapioController } from './cardapio/cardapio.controller';
import { CardapioService } from './services/Cardapio/CardapioService';
import { EstoqueModule } from './estoque/estoque.module';
import { PedidoModule } from './pedido/pedido.module';
import { Estoque } from './services/Estoque/Estoque.entity';
import { EstoqueController } from './estoque/estoque.controller';
import { EstoqueService } from './services/Estoque/EstoqueService';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cardapio, CategoriaCardapio,Estoque]),
    EstoqueModule,
    PedidoModule,
  ],
  controllers: [CategoriaCardapioController, CardapioController, EstoqueController],
  providers: [CategoriaCardapioService, CardapioService,EstoqueService],
})
export class AppModule {}
