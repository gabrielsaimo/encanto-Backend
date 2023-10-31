/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cardapio } from './cardapio.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class CardapioService {
  constructor(
    @InjectRepository(Cardapio)
    private readonly CardapioRepository: Repository<any>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll(): Promise<Cardapio> {
    const value: Cardapio = await this.cacheManager.get('Cardapio');
    if (value) {
      console.log('cache');
      return value;
    }
    const response = await this.CardapioRepository.query(
      'select * from "Encanto".cardapio c order by id'
    );
    console.log('banco');
    await this.cacheManager.set('Cardapio', response, 0);
    return response;
  }

  async update(cardapio: Cardapio): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'update "Encanto".cardapio set active = $1 , name = $2 , price= $3 , description = $4 , category= $5 , sub = $6 , update_at = $7 , update_by= $8 , imagem=$9 where id = $10',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.imagem,
        cardapio.id,
      ]
    );
  }

  async create(cardapio: Cardapio): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'insert into "Encanto".cardapio (active, name, price, description, category, sub, update_at,update_by, imagem, id ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.imagem,
        cardapio.id,
      ]
    );
  }

  async delete(id: any): Promise<void> {
    this.cacheManager.set('Cardapio', undefined, 0);
    return await this.CardapioRepository.query(
      'delete from "Encanto".cardapio where id = $1',
      [id]
    );
  }
}
