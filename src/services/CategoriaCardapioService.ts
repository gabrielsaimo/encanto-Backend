import { Injectable, Post } from '@nestjs/common';
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
    return this.categoriaCardapioRepository.query(
      'select * from "Encanto".categoriacardapio c',
    );
  }

  async update(categoriaCardapio: CategoriaCardapio): Promise<any> {
    return this.categoriaCardapioRepository.query(
      'update "Encanto".categoriacardapio set active = $1 , name = $2 where id = $3',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }

  async create(categoriaCardapio: CategoriaCardapio): Promise<any> {
    return this.categoriaCardapioRepository.query(
      'insert into "Encanto".categoriacardapio (active, name, id) values ($1, $2, $3)',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }

  async delete(categoriaCardapio: CategoriaCardapio): Promise<any> {
    return this.categoriaCardapioRepository.query(
      'delete from "Encanto".categoriacardapio where id = $1',
      [categoriaCardapio],
    );
  }
}
