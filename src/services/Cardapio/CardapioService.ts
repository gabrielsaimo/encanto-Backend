/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cardapio } from './cardapio.entity';

@Injectable()
export class CardapioService {
  constructor(
    @InjectRepository(Cardapio)
    private readonly CardapioRepository: Repository<any>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.CardapioRepository.query('select * from "Encanto".cardapio c');
  }

  async update(cardapio: Cardapio): Promise<any> {
    return this.CardapioRepository.query(
      'update "Encanto".cardapio set active = $1 , name = $2 , price= $3 , description = $4 , category= $5 , sub = $6 , update_at = $7 , update_by= $8 where id = $7',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.id,
      ],
    );
  }

  async create(cardapio: Cardapio): Promise<any> {
    return this.CardapioRepository.query(
      'insert into "Encanto".cardapio (active, name, price, description, category, sub, update_at,update_by, id) values ($1, $2, $3, $4, $5, $6, $7)',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.id,
      ],
    );
  }

  async delete(id: any): Promise<void> {
    return this.CardapioRepository.query(
      'delete from "Encanto".cardapio where id = $1',
      [id],
    );
  }
}
