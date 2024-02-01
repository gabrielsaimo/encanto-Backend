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
import { Estoque } from 'src/services/Estoque/Estoque.entity';
import { EstoqueService } from 'src/services/Estoque/Estoque.service';
import { validate } from 'class-validator';
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueServise: EstoqueService) {}

  @Get()
  async findAll(): Promise<Estoque[]> {
    try {
      return await this.estoqueServise.findAll();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async update(@Body() estoque: Estoque): Promise<any> {
    const errors = await validate(estoque);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return await this.estoqueServise.update(estoque);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put()
  async create(@Body() estoque: Estoque): Promise<any> {
    const errors = await validate(estoque);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return await this.estoqueServise.create(estoque);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(':id')
  async delete(@Param('id') estoque: Estoque): Promise<any> {
    try {
      return await this.estoqueServise.delete(estoque);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
