// eslint-disable-next-line prettier/prettier
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
  async delete(@Param('id') id: any): Promise<any> {
    return this.CardapioService.delete(id);
  }

  @Post('imagem')
  async imagem(@Body() imagem: any): Promise<any> {
    return this.CardapioService.updateImage(imagem);
  }

  @Delete('deleteimagem/:id')
  async deleteImagem(@Param('id') id: number): Promise<any> {
    return this.CardapioService.deleteImage(id);
  }

  @Post('imagemsub')
  async imagemSub(@Body() imagem: any): Promise<any> {
    return this.CardapioService.updateImageId(imagem);
  }

  @Post('InsertImg')
  async updateImg(@Body() cardapio: Cardapio): Promise<any> {
    return this.CardapioService.createImage(cardapio);
  }

  @Get('imagem/:id')
  async findImg(@Param('id') id: any): Promise<any> {
    return this.CardapioService.findImageReq(id);
  }
}
