import {
    Body,
    Param,
    Controller,
    Delete,
    Get,
    Post,
    Put,
  } from '@nestjs/common';
import { Pedido } from 'src/services/Pedido/Pedido.entity';
import { PedidoService } from 'src/services/Pedido/PedidoService';

@Controller('pedido')
export class PedidoController {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly pedidoServise: PedidoService,
  ) {}

  @Get()
  async findPedido(): Promise<Pedido[]> {
    return this.pedidoServise.findPedido();
  }

  @Get('mesa')
  async findMessa(): Promise<Pedido[]> {
    return this.pedidoServise.findMessa();
  }

  @Get('mesa/:mesa')
  async findPedidoByMesa(@Param('mesa') mesa: string): Promise<Pedido[]> {
    return this.pedidoServise.findPedidoByMesa(mesa);
  }

  @Post('status')
  async postPedidoStatus(@Body() data: any): Promise<Pedido[]> {
    return this.pedidoServise.postPedidoStatus(data);
  }
  
/*
  @Post()
  async update(@Body() estoque: Pedido): Promise<any> {
    return this.pedidoServise.update(estoque);
  }

  
*/
@Put()
  async create(@Body() pedido: Pedido): Promise<any> {
    return this.pedidoServise.create(pedido);
  }
}

