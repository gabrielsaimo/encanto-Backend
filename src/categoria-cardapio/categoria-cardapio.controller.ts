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
import { CategoriaCardapioService } from '../services/Categoria/CategoriaCardapio.service';
import { CategoriaCardapio } from '../services/Categoria/categoria-cardapio.entity';
import { validate } from 'class-validator';
@Controller('categoria-cardapio')
export class CategoriaCardapioController {
  constructor(
    private readonly categoriaCardapioService: CategoriaCardapioService
  ) {}

  @Get()
  async findAll(): Promise<CategoriaCardapio> {
    try {
      return this.categoriaCardapioService.findAll();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async update(@Body() categoriaCardapio: CategoriaCardapio): Promise<any> {
    const errors = await validate(categoriaCardapio);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.categoriaCardapioService.update(categoriaCardapio);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put()
  async create(@Body() categoriaCardapio: CategoriaCardapio): Promise<any> {
    const errors = await validate(categoriaCardapio);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.categoriaCardapioService.create(categoriaCardapio);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') categoriaCardapio: CategoriaCardapio
  ): Promise<any> {
    try {
      return this.categoriaCardapioService.delete(categoriaCardapio);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
