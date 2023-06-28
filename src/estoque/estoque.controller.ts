import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { Estoque } from 'src/services/Estoque/Estoque.entity';
import { EstoqueService } from 'src/services/Estoque/EstoqueService';

@Controller('estoque')
export class EstoqueController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly estoqueServise: EstoqueService) {}

  @Get()
  async findAll(): Promise<Estoque[]> {
    return this.estoqueServise.findAll();
  }

  @Post()
  async update(@Body() estoque: Estoque): Promise<any> {
    return this.estoqueServise.update(estoque);
  }

  @Put()
  async create(@Body() estoque: Estoque): Promise<any> {
    return this.estoqueServise.create(estoque);
  }

  @Delete(':id')
  async delete(@Param('id') estoque: Estoque): Promise<any> {
    return this.estoqueServise.delete(estoque);
  }
}
