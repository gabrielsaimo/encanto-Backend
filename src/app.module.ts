import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TimeoutMiddleware } from './timeout.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCardapio } from './services/Categoria/categoria-cardapio.entity';
import { CategoriaCardapioService } from './services/Categoria/CategoriaCardapio.service';
import { CategoriaCardapioController } from './categoria-cardapio/categoria-cardapio.controller';
import { databaseConfig } from './config/database.config';
import { Cardapio } from './services/Cardapio/cardapio.entity';
import { CardapioController } from './cardapio/cardapio.controller';
import { CardapioService } from './services/Cardapio/Cardapio.service';
import { EstoqueModule } from './estoque/estoque.module';

import { Estoque } from './services/Estoque/Estoque.entity';
import { EstoqueController } from './estoque/estoque.controller';
import { EstoqueService } from './services/Estoque/Estoque.service';
import { StartModule } from './start/start.module';
import { Start } from './services/Start/start.entity';
import { StartController } from './start/start.controller';
import { StartService } from './services/Start/Start.service';
import { User } from './services/User/User.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './services/User/User.service';
import { Pedido } from './services/Pedido/Pedido.entity';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './services/Pedido/Pedido.service';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './services/EmailService/Email.service';
import { WebSocketModule } from './web-socket/web-socket.module';
import { NotificationsController } from './web-socket/web-socket.controller';
import { NotificationsGateway } from './web-socket/notifications.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { GerenciamentoController } from './gerenciamento/gerenciamento.controller';
import { GerenciamentoModule } from './gerenciamento/gerenciamento.module';
import { Gerenciamento_entity } from './services/Gerenciamento/gerenciamento.entity';
import { GerenciamentoService } from './services/Gerenciamento/gerenciamento.service';
import { WhatsappService } from './services/WhatsApp_BOT/whatsapp.service';
import { WhastappController } from './services/WhatsApp_BOT/whatsapp.controller';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      Start,
      User,
      Cardapio,
      CategoriaCardapio,
      Estoque,
      Pedido,
      Gerenciamento_entity,
      //  Pagamentos_entity,
    ]),
    EstoqueModule,
    PedidoModule,
    StartModule,
    UserModule,
    EmailModule,
    WebSocketModule,
    //  PagamentosModule,
    GerenciamentoModule,
  ],
  controllers: [
    CategoriaCardapioController,
    CardapioController,
    EstoqueController,
    StartController,
    UserController,
    PedidoController,
    EmailController,
    // PagamentosController,
    NotificationsController,
    GerenciamentoController,
    WhastappController,
  ],
  providers: [
    CategoriaCardapioService,
    CardapioService,
    EstoqueService,
    StartService,
    UserService,
    PedidoService,
    // PagamentosService,
    EmailService,
    GerenciamentoService,
    NotificationsGateway,
    WhatsappService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeoutMiddleware).forRoutes('*');
  }
}
