import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { Pedido } from 'src/services/Pedido/Pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from 'src/services/Pedido/PedidoService';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
