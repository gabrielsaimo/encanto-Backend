import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { CardapioService } from '../services/Cardapio/Cardapio.service';
import { Cardapio } from '../services/Cardapio/cardapio.entity';

@Controller('cardapio')
export class CardapioController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly CardapioService: CardapioService) {}

  @Get()
  async findAll(): Promise<Cardapio> {
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

  @Delete(':id')
  async delete(@Param('id') id: any): Promise<void> {
    return this.CardapioService.delete(id);
  }

  @Post('imagem')
  async imagem(@Body() imagem: any): Promise<any> {
    return this.CardapioService.updateImage(imagem);
  }
}
