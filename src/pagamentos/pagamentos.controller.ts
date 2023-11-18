import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PagamentosService } from 'src/services/Pagamentos/pagamentos.service';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get('/:id')
  async getPagamentos_id(@Param('id') id: number): Promise<any[]> {
    return this.pagamentosService.getPagamentos_id(id);
  }

  @Put()
  async createPagamento(@Body() data: any): Promise<any[]> {
    return this.pagamentosService.createPagamento(data);
  }

  @Get('/relatorio/vendas')
  async getRelatorioPagamentos(@Body() data: any): Promise<any[]> {
    return this.pagamentosService.getRelatorioPagamentos(data);
  }
}
