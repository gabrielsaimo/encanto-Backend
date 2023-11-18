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

  async getRelatorioPagamentos(data: any): Promise<any[]> {
    return this.pagamentosRepository.query(
      `SELECT subquery.*, 
      SUM(subquery.total_pago) OVER () AS soma_total
      FROM (
      SELECT p.id,
          p.status,
          p.created_at,
          p.created_by as garcom,
          p.id_mesa,
          p.mesa,
          p.valor,
          p.obs,
          p.pedidos,
          p.acepted_at,
          p.acepted_by as cozinha,
          STRING_AGG(p2.tipo::TEXT, ', ') AS tpPG,
          STRING_AGG(p2.valor::TEXT, ', ') AS valorPg,
          p2.created_by as recebido_por,
          SUM(CAST(valor_individual AS NUMERIC)) AS total_pago
        FROM "Encanto".pedido p
        LEFT JOIN "Encanto".pedidos_uni pu ON p.pedidos = pu.idpedido
        JOIN "Encanto".pagamentos p2 ON p.id = p2.idpedido
        CROSS JOIN LATERAL unnest(string_to_array(p2.valor::TEXT, ', ')) AS valor_individual
        WHERE p2.created_at BETWEEN '$1 00:00:00.001' AND '$2 23:59:59.999'
        GROUP BY p.id, p.status, p.created_at, p.created_by, p.id_mesa, p.mesa, p.valor, p.obs, p.pedidos, p.acepted_at, p.acepted_by, p2.created_by) AS subquery;`,
      [data.data_inicial, data.data_final]
    );
  }
}
