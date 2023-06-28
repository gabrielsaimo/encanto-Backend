import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaCardapioService } from '../services/Categoria/CategoriaCardapioService';
import { CategoriaCardapio } from '../services/Categoria/categoria-cardapio.entity';

@Controller('categoria-cardapio')
export class CategoriaCardapioController {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly categoriaCardapioService: CategoriaCardapioService
  ) {}

  @Get()
  async findAll(): Promise<CategoriaCardapio> {
    return this.categoriaCardapioService.findAll();
  }

  @Post()
  async update(@Body() categoriaCardapio: CategoriaCardapio): Promise<any> {
    return this.categoriaCardapioService.update(categoriaCardapio);
  }

  @Put()
  async create(@Body() categoriaCardapio: CategoriaCardapio): Promise<any> {
    return this.categoriaCardapioService.create(categoriaCardapio);
  }

  @Delete(':id')
  async delete(
    @Param('id') categoriaCardapio: CategoriaCardapio
  ): Promise<any> {
    return this.categoriaCardapioService.delete(categoriaCardapio);
  }
}
