import { Controller, Get } from '@nestjs/common';
import { CategoriaCardapioService } from '../services/CategoriaCardapioService';
import { CategoriaCardapio } from '../services/categoria-cardapio.entity';

@Controller('categoria-cardapio')
export class CategoriaCardapioController {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly categoriaCardapioService: CategoriaCardapioService,
  ) {}

  @Get()
  async findAll(): Promise<CategoriaCardapio[]> {
    return this.categoriaCardapioService.findAll();
  }
}
