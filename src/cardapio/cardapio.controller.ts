import { Controller, Get } from '@nestjs/common';
import { CardapioService } from '../services/CardapioService';
import { Cardapio } from '../services/cardapio.entity';

@Controller('cardapio')
export class CardapioController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly CardapioService: CardapioService) {}

  @Get()
  async findAll(): Promise<Cardapio[]> {
    return this.CardapioService.findAll();
  }
}
