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

  @Get('adm')
  async findPedidoAdm(): Promise<Pedido[]> {
    return this.pedidoServise.findPedidoAdm();
  }
  
  @Get('mesa')
  async findMessa(): Promise<Pedido[]> {
    return this.pedidoServise.findMessa();
  }

  @Get('mesa/:mesa')
  async findPedidoByMesa(@Param('mesa') mesa: string): Promise<Pedido[]> {
    return this.pedidoServise.findPedidoByMesa(mesa);
  }

  @Get('verif/:mesa')
  async verifMesa(@Param('mesa') mesa: number): Promise<Pedido[]> {
    return this.pedidoServise.verifMesa(mesa);
  }

  @Get('mesa/adm')
  async findMessaAdm(): Promise<Pedido[]> {
    return this.pedidoServise.findMessaAdm();
  }

  @Get('status/:id')
  async findStatusPedido(@Param('id') id: number): Promise<Pedido[]> {
    return this.pedidoServise.findStatusPedido(id);
  }
  

  @Post('status')
  async postPedidoStatus(@Body() data: any): Promise<Pedido[]> {
    return this.pedidoServise.postPedidoStatus(data);
  }


  @Post('transferir')
  async trasnfPedidoByMesa(@Body() data: any): Promise<Pedido[]> {
    return this.pedidoServise.trasnfPedidoByMesa(data);
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

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.pedidoServise.delete(id);
  }
}

