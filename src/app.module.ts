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

import { Estoque } from './services/Estoque/Estoque.entity';
import { EstoqueController } from './estoque/estoque.controller';
import { EstoqueService } from './services/Estoque/EstoqueService';
import { StartModule } from './start/start.module';
import { Start } from './services/Start/start.entity';
import { StartController } from './start/start.controller';
import { StartService } from './services/Start/StartService';
import { User } from './services/User/User.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './services/User/UserService';
import { Pedido } from './services/Pedido/Pedido.entity';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './services/Pedido/PedidoService';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Start,User,Cardapio, CategoriaCardapio,Estoque,Pedido]),
    EstoqueModule,
    PedidoModule,
    StartModule,
    UserModule,
  ],
  controllers: [CategoriaCardapioController, CardapioController, EstoqueController, StartController,UserController,PedidoController],
  providers: [CategoriaCardapioService, CardapioService,EstoqueService,StartService,UserService,PedidoService],
})
export class AppModule {}
