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
import { StartModule } from './start/start.module';
import { Start } from './services/Start/start.entity';
import { StartController } from './start/start.controller';
import { StartService } from './services/Start/StartService';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Start,Cardapio, CategoriaCardapio,Estoque]),
    EstoqueModule,
    PedidoModule,
    StartModule,
  ],
  controllers: [CategoriaCardapioController, CardapioController, EstoqueController, StartController],
  providers: [CategoriaCardapioService, CardapioService,EstoqueService,StartService],
})
export class AppModule {}
