// eslint-disable-next-line prettier/prettier
import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CardapioService } from '../services/Cardapio/Cardapio.service';
import { Cardapio } from '../services/Cardapio/cardapio.entity';
import { validate } from 'class-validator';
@Controller('cardapio')
export class CardapioController {
  constructor(private readonly CardapioService: CardapioService) {}

  @Get()
  async findAll(): Promise<Cardapio> {
    try {
      return await this.CardapioService.findAll();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async update(@Body() cardapio: Cardapio): Promise<any> {
    const errors = await validate(cardapio);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return await this.CardapioService.update(cardapio);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put()
  async create(@Body() cardapio: Cardapio): Promise<any> {
    const errors = await validate(cardapio);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return await this.CardapioService.create(cardapio);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: any): Promise<any> {
    try {
      return await this.CardapioService.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('imagem')
  async imagem(@Body() imagem: any): Promise<any> {
    try {
      return await this.CardapioService.createImage(imagem);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('deleteimagem/:id')
  async deleteImagem(@Param('id') id: number): Promise<any> {
    try {
      return await this.CardapioService.deleteImage(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('imagemsub')
  async imagemSub(@Body() imagem: any): Promise<any> {
    try {
      return await this.CardapioService.createImage(imagem);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('InsertImg')
  async updateImg(@Body() cardapio: Cardapio): Promise<any> {
    return this.CardapioService.createImage(cardapio);
  }

  @Get('imagem/:id')
  async findImg(@Param('id') id: any): Promise<any> {
    return this.CardapioService.findImageReq(id);
  }

  @Get('destaques')
  async findDestaques(): Promise<any> {
    try {
      return await this.CardapioService.findDestaques();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
