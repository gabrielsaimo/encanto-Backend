import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CardapioService } from '../services/CardapioService';
import { Cardapio } from '../services/cardapio.entity';

@Controller('cardapio')
export class CardapioController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly CardapioService: CardapioService) {}

  @Get()
  async findAll(): Promise<Cardapio[]> {
    JSON.stringify(this.CardapioService.findAll());
    return this.CardapioService.findAll();
  }

  @Post()
  async update(@Body() cardapio: Cardapio): Promise<any> {
    return this.CardapioService.update(cardapio);
  }

  @Put()
  async create(@Body() cardapio: Cardapio): Promise<any> {
    return this.CardapioService.create(cardapio);
  }

  @Delete()
  async delete(@Body() cardapio: Cardapio): Promise<any> {
    return this.CardapioService.delete(cardapio);
  }
}
