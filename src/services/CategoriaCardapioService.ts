import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaCardapio } from './categoria-cardapio.entity';

@Injectable()
export class CategoriaCardapioService {
  constructor(
    @InjectRepository(CategoriaCardapio)
    private readonly categoriaCardapioRepository: Repository<any>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.categoriaCardapioRepository.query('select * from "Encanto".categoriacardapio c');
  }
}