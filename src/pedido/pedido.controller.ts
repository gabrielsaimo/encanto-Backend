import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { Pedido } from 'src/services/Pedido/Pedido.entity';
import { PedidoService } from 'src/services/Pedido/Pedido.service';

@Controller('pedido')
export class PedidoController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly pedidoServise: PedidoService) {}

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

  @Get('verif/finalizar/:mesa')
  async verifFinalizar(@Param('mesa') mesa: number): Promise<Pedido[]> {
    return this.pedidoServise.verifFinalizar(mesa);
  }

  @Get('mesa/adm')
  async findMessaAdm(): Promise<Pedido[]> {
    return this.pedidoServise.findMessaAdm();
  }

  @Get('valor/:mesa')
  async valorMesa(@Param('mesa') mesa: number): Promise<Pedido[]> {
    return this.pedidoServise.valorMesa(mesa);
  }

  @Post('finalizar')
  async finalizarMesa(@Body() data: any): Promise<Pedido[]> {
    return this.pedidoServise.finalizarMesa(data);
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

  @Put('mesa')
  async createMesa(@Body() pedido: any): Promise<any> {
    return this.pedidoServise.createMesa(pedido);
  }

  @Put('pedidos')
  async createPedido(@Body() pedido: any): Promise<any> {
    return this.pedidoServise.createPedido(pedido);
  }

  @Get('pedidos')
  async getPedidos(): Promise<Pedido[]> {
    return this.pedidoServise.getPedidos();
  }

  @Post('pedidos')
  async updateStatusPedidos_uni(@Body() data: any): Promise<Pedido[]> {
    return this.pedidoServise.updateStatusPedidos_uni(data);
  }

  @Get('pedidos/:id')
  async getPedidos_unit(@Param('id') id: number): Promise<Pedido[]> {
    return this.pedidoServise.getPedidos_unit(id);
  }

  @Get('bar')
  async getPedidosBar(): Promise<Pedido[]> {
    return this.pedidoServise.getPedidosBar();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.pedidoServise.delete(id);
  }

  @Delete('mesa/:id')
  async deleteMesa(@Param('id') id: number): Promise<any> {
    return this.pedidoServise.deleteMesa(id);
  }

  @Get('pagamentos/:id')
  async getPagamentos_id(@Param('id') id: number): Promise<any[]> {
    return this.pedidoServise.getPagamentos_id(id);
  }

  @Put('pagamentos')
  async createPagamento(@Body() data: any): Promise<any[]> {
    return this.pedidoServise.createPagamento(data);
  }

  @Get('pagamentos/verify/:id')
  async verifyPagamento(@Param('id') id: number): Promise<any[]> {
    return this.pedidoServise.verificaStatusPedido(id);
  }

  @Get('/relatorio/vendas')
  async getRelatorioPagamentos(
    @Query('data_inicial') dataInicial: any,
    @Query('data_final') dataFinal: any,
    @Query('tipo') tipo: any
  ): Promise<any[]> {
    return this.pedidoServise.getRelatorioPagamentos(
      dataInicial,
      dataFinal,
      tipo
    );
  }

  @Get('/relatorio/pedidos')
  async getRelatorioPedidosUni(
    @Query('data_inicial') dataInicial: any,
    @Query('data_final') dataFinal: any
  ): Promise<any[]> {
    return this.pedidoServise.getRelatorioPedidosUni(dataInicial, dataFinal);
  }
}
