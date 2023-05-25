import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from './Estoque.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<any>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.estoqueRepository.query(
      'select * from "Encanto".estoque e ',
    );
  }

  async update(estoque: Estoque): Promise<any> {
    return this.estoqueRepository.query(
      'update "Encanto".estoque set price = $1 , nm_produto = $2, tp_produto= $3, tp_peso = $4 , ds_produto = $5, validade = $6 , update_at = $7  where id = $8',
      [estoque.price, estoque.nm_produto,estoque.tp_produto,estoque.tp_peso,estoque.ds_produto,estoque.validade , estoque.updated_at, estoque.id],
    );
  }

  async create(estoque: Estoque): Promise<any> {
    return this.estoqueRepository.query(
      'insert into "Encanto".estoque (id,price,nm_produto,tp_produto,tp_peso,ds_produto,validade, update_at) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      [estoque.id, estoque.price, estoque.nm_produto,estoque.tp_produto,estoque.tp_peso,estoque.ds_produto,estoque.validade , estoque.updated_at],
    );
  }

  async delete(estoque: Estoque): Promise<any> {
    return this.estoqueRepository.query(
      'delete from "Encanto".estoque where id = $1',
      [estoque],
    );
  }
}
