import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaCardapio } from './categoria-cardapio.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CategoriaCardapioService {
  constructor(
    @InjectRepository(CategoriaCardapio)
    private readonly categoriaCardapioRepository: Repository<CategoriaCardapio>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll(): Promise<CategoriaCardapio> {
    const value: any = await this.cacheManager.get('CategoriaCardapio');
    if (value) {
      console.log('cache');
      return value;
    }
    const response = await this.categoriaCardapioRepository.query(
      'select * from "Encanto".categoriacardapio order by id'
    );
    console.log('banco');
    await this.cacheManager.set('CategoriaCardapio', response, 0);
    return response;
  }

  async update(categoriaCardapio: CategoriaCardapio): Promise<any> {
    await this.cacheManager.del('CategoriaCardapio');
    return this.categoriaCardapioRepository.query(
      'update "Encanto".categoriacardapio set active = $1 , name = $2 where id = $3',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id]
    );
  }

  async create(categoriaCardapio: CategoriaCardapio): Promise<any> {
    await this.cacheManager.del('CategoriaCardapio');
    return this.categoriaCardapioRepository.query(
      'insert into "Encanto".categoriacardapio (active, name, id) values ($1, $2, $3)',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id]
    );
  }

  async delete(categoriaCardapio: CategoriaCardapio): Promise<any> {
    await this.cacheManager.del('CategoriaCardapio');
    return this.categoriaCardapioRepository.query(
      'delete from "Encanto".categoriacardapio where id = $1',
      [categoriaCardapio]
    );
  }
}
