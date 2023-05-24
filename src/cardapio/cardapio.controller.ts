import { Controller, Get } from '@nestjs/common';

@Controller('cardapio')
export class CardapioController {
  @Get()
  findAll(): string {
    return 'List of cardapio';
  }
}
