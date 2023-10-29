/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamentos_entity } from './Pagamentos.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamentos_entity)
    private readonly pagamentosRepository: Repository<Pagamentos_entity[]>
  ) {}

  async getPagamentos_id(id: number): Promise<Pagamentos_entity[]> {
    return this.pagamentosRepository.query(
      `SELECT p.*, 
      (SELECT SUM(valor) FROM "Encanto".pagamentos WHERE idpedido = 123) AS valor_pgt
        FROM "Encanto".pagamentos p
        WHERE p.idpedido = $1;`,
      [id]
    );
  }

  async createPagamento(data: Pagamentos_entity): Promise<Pagamentos_entity[]> {
    return this.pagamentosRepository.query(
      `INSERT INTO "Encanto".pagamentos (id,idpedido, tipo, valor, created_at, created_by)
        VALUES ($1, $2, $3, $4, $5, $6);`,
      [
        data.id,
        data.idpedido,
        data.tipo,
        data.valor,
        data.created_at,
        data.created_by,
      ]
    );
  }
}   