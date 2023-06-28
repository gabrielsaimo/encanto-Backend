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
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './services/EmailService/EmailService';
import { WebSocketModule } from './web-socket/web-socket.module';
import { NotificationsController } from './web-socket/web-socket.controller';
import { NotificationsGateway } from './web-socket/notifications.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 1000
    }) ,
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Start,User,Cardapio, CategoriaCardapio,Estoque,Pedido]),
    EstoqueModule,
    PedidoModule,
    StartModule,
    UserModule,
    EmailModule,
    WebSocketModule
  ],
  controllers: [CategoriaCardapioController, CardapioController, EstoqueController, StartController,UserController,PedidoController,EmailController,NotificationsController],
  providers: [CategoriaCardapioService, CardapioService,EstoqueService,StartService,UserService,PedidoService,EmailService,NotificationsGateway],
})
export class AppModule {}
