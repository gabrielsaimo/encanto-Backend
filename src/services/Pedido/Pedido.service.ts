/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './Pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<any>
  ) {}

  async findPedido(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where status not in('Concluido','Cancelado') ORDER BY created_at DESC;`
    );
  }
  async findPedidoAdm(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido  order by update_at desc;`
    );
  }

  async findMessa(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".mesa where status not in('Fechado');`
    );
  }

  async verifMesa(mesa: number): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select id,nm_mesa from "Encanto".mesa where nm_mesa = $1 and status not in('Fechado');`,
      [mesa]
    );
  }

  async verifFinalizar(mesa: number): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where id_mesa = $1 and status not in('Finalizado','Cancelado');`,
      [mesa]
    );
  }

  async findMessaAdm(): Promise<Pedido[]> {
    return this.pedidoRepository.query(`select * from "Encanto".mesa;`);
  }

  async valorMesa(mesa: number): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select Sum(valor) as valor from "Encanto".pedido where id_mesa = $1`,
      [mesa]
    );
  }

  async finalizarMesa(data: any): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `update "Encanto".mesa set status = 'Fechado' ,idpedido = $1 ,obs =$2 ,closed_at =$3,closed_by =$4, valor =$5 where id = $6`,
      [
        data.idpedido,
        data.obs,
        data.closed_at,
        data.closed_by,
        data.valor,
        data.id,
      ]
    );
  }

  async findStatusPedido(id): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select status from "Encanto".pedido where id = $1;`,
      [id]
    );
  }

  async findPedidoByMesa(mesa: string): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where mesa = $1 and status != 'Finalizado' ORDER BY created_at DESC;`,
      [mesa]
    );
  }

  async trasnfPedidoByMesa(data: Pedido): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `update "Encanto".pedido set mesa = $1 , update_by = $2 ,update_at = $3 ,id_mesa =$4 where id = $5`,
      [data.mesa, data.update_by, data.update_at, data.id_mesa, data.id]
    );
  }

  async postPedidoStatus(data: Pedido): Promise<Pedido[]> {
    if (data.status !== 'Em Preparo' && data.status !== 'Em Cancelamento') {
      return this.pedidoRepository.query(
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,finished_by = $4, finished_at = $5, taxa = $6 where id = $7`,
        [
          data.status,
          data.update_by,
          data.update_at,
          data.finished_by,
          data.finished_at,
          data.taxa,
          data.id,
        ]
      );
    } else if (data.status === 'Em Cancelamento') {
      return this.pedidoRepository.query(
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,finished_by = $4, finished_at = $5, obs_cancel = $6 where id = $7`,
        [
          data.status,
          data.update_by,
          data.update_at,
          data.finished_by,
          data.finished_at,
          data.obs_cancel,
          data.id,
        ]
      );
    } else {
      return this.pedidoRepository.query(
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,acepted_by = $4 , acepted_at= $5 ,finished_by = $6, finished_at = $7  where id = $8`,
        [
          data.status,
          data.update_by,
          data.update_at,
          data.acepted_by,
          data.acepted_at,
          data.finished_by,
          data.finished_at,
          data.id,
        ]
      );
    }
  }

  async create(data: Pedido): Promise<Pedido> {
    return this.pedidoRepository.query(
      `INSERT INTO "Encanto".pedido
    (id, created_at, desconto, mesa, id_mesa, obs, pedidos, status, valor, created_by, acepted_by, acepted_at, update_by, finished_by, finished_at, update_at,type) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14, $15, $16,$17)`,
      [
        data.id,
        data.created_at,
        data.desconto,
        data.mesa,
        data.id_mesa,
        data.obs,
        data.pedidos,
        data.status,
        data.valor,
        data.created_by,
        data.acepted_by,
        data.acepted_at,
        data.update_by,
        data.finished_by,
        data.finished_at,
        data.update_at,
        data.type,
      ]
    );
  }

  async createMesa(data: any): Promise<any> {
    return this.pedidoRepository.query(
      `INSERT INTO "Encanto".mesa (id, nm_mesa, status,created_at,created_by) values ($1, $2, $3, $4, $5)`,
      [data.id, data.nm_mesa, data.status, data.created_at, data.created_by]
    );
  }

  async createPedido(data: any): Promise<any> {
    return this.pedidoRepository.query(
      `INSERT INTO "Encanto".pedidos_uni
      (id, qdt, item, valor, obs, idpedido, categoria, iditem, idmesa, status, update_at, update_by, created_at, created_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [
        data.id,
        data.qdt,
        data.item,
        data.valor,
        data.obs,
        data.idpedido,
        data.categoria,
        data.iditem,
        data.idmesa,
        data.status,
        data.update_at,
        data.update_by,
        data.created_at,
        data.created_by,
      ]
    );
  }

  async createPedidoDelivery(data: any): Promise<any> {
    return this.pedidoRepository.query(
      `INSERT INTO "Encanto".pedidos_delivery
      (id, qdt, item, valor, idpedido, categoria, iditem, status, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        data.id,
        data.qdt,
        data.item,
        data.valor,
        data.idpedido,
        data.categoria,
        data.iditem,
        data.status,
        data.created_at,
      ]
    );
  }

  async updateStatusPedidos_uni(data: Pedido): Promise<any> {
    return this.pedidoRepository.query(
      `update "Encanto".pedidos_uni set status = $1 , update_by = $2 ,update_at = $3 where id = $4`,
      [data.status, data.update_by, data.update_at, data.id]
    );
  }

  async getPedidos_unit(id: number): Promise<any> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedidos_uni p where p.idpedido = $1 ;`,
      [id]
    );
  }

  async getPedidos(): Promise<any> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedidos_uni p ;`
    );
  }

  async getPedidosDate(data_inicial: any, data_final: any): Promise<any> {
    return this.pedidoRepository.query(
      `SELECT *
      FROM "Encanto".pedidos_uni p
      WHERE p.created_at >= $1 AND p.created_at <= $2;`,
      [data_inicial, data_final]
    );
  }

  async delete(id: number): Promise<any> {
    return this.pedidoRepository.query(
      'delete from "Encanto".pedido where id = $1',
      [id]
    );
  }

  async deleteMesa(id: number): Promise<any> {
    return this.pedidoRepository.query(
      'delete from "Encanto".mesa where id = $1',
      [id]
    );
  }

  async getPedidosBar(): Promise<any> {
    return this.pedidoRepository.query(
      `select p.*,p2.id as idPtincipal from "Encanto".pedidos_uni p left join "Encanto".pedido p2 on (p.idpedido=p2.pedidos) where p.categoria in ('Bebidas','Sucos exóticos','Drinks','Cerveja') and p.status != 'Finalizado';`
    );
  }

  async getPagamentos_id(id: number): Promise<any[]> {
    return this.pedidoRepository.query(
      `SELECT p.*, 
      (SELECT SUM(valor) FROM "Encanto".pagamentos WHERE idpedido = $1) AS valor_pgt
        FROM "Encanto".pagamentos p
        WHERE p.idpedido = $1;`,
      [id]
    );
  }

  async createPagamento(data: any): Promise<any[]> {
    return this.pedidoRepository.query(
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

  async verificaStatusPedido(id: number): Promise<any[]> {
    return this.pedidoRepository.query(
      `SELECT pu.status
      FROM "Encanto".pedido p
      JOIN "Encanto".pedidos_uni pu ON (p.pedidos = pu.idpedido)
      WHERE p.pedidos = $1
      GROUP BY pu.status
      HAVING COUNT(DISTINCT pu.status) = 1;`,
      [id]
    );
  }

  async getStatusPedido(id: number): Promise<any[]> {
    return this.pedidoRepository.query(
      `select pu.qdt,pu.item,pu.status  from "Encanto".pedidos_uni pu join "Encanto".pedido p on(p.pedidos = pu.idpedido) where pu.idmesa = $1 and pu.status  not in ('Cancelado','Concluido') and p.status not in ('Concluido')`,
      [id]
    );
  }

  async getRelatorioPagamentos(
    data_inicial: any,
    data_final: any,
    tipo: any
  ): Promise<any[]> {
    return this.pedidoRepository.query(
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
          p.taxa,
          p.pedidos,
          p.acepted_at,
          p.acepted_by as cozinha,
          STRING_AGG(p2.tipo::TEXT, ', ') AS tpPG,
          STRING_AGG(p2.valor::TEXT, ', ') AS valorPg,
          p2.created_by as recebido_por,
          SUM(CAST(valor_individual AS NUMERIC)) AS total_pago,
          SUM(CASE WHEN p2.tipo = 'Cortesia' THEN CAST(valor_individual AS NUMERIC) ELSE 0 END) AS total_cortesia
   FROM "Encanto".pedido p
   JOIN "Encanto".pagamentos p2 ON p.id = p2.idpedido
   CROSS JOIN LATERAL unnest(string_to_array(p2.valor::TEXT, ', ')) AS valor_individual
   WHERE p2.tipo IN ('${tipo
     .split(',')
     .join("','")}') AND p2.created_at BETWEEN $1 AND $2
   GROUP BY p.id, p.status, p.created_at, p.created_by, p.id_mesa, p.mesa, p.valor, p.obs, p.pedidos, p.acepted_at, p.acepted_by, p2.created_by, p.taxa
   ORDER BY p.acepted_at DESC
) AS subquery;`,
      [data_inicial, data_final]
    );
  }

  getRelatorioPedidosUni(data_inicial: any, data_final: any): Promise<any[]> {
    console.log(data_inicial);
    return this.pedidoRepository.query(
      `SELECT subquery.*, 
      SUM(subquery.valor_total_uni) OVER () AS soma_total
    FROM (
      SELECT pu.item , SUM(pu.qdt * pu.qdt) as qdt_vendido, sum(pu.valor) as valor_total_uni from "Encanto".pedidos_uni pu where pu.created_at between $1 AND $2 group by pu.qdt,pu.item order by qdt_vendido desc 
          ) AS subquery;`,
      [data_inicial, data_final]
    );
  }
  getGraficoMesses(messes: any): Promise<any[]> {
    return this.pedidoRepository.query(
      `SELECT 
      EXTRACT(MONTH FROM DATE_TRUNC('month', subquery.created_at)) AS numero_mes,
      EXTRACT(YEAR FROM subquery.created_at) AS ano,
      SUM(subquery.total_pago) AS soma_total
  FROM (
      SELECT 
          p.id,
          p.status,
          p.created_at,
          p.created_by as garcom,
          p.id_mesa,
          p.mesa,
          p.valor,
          p.obs,
          p.taxa,
          p.pedidos,
          p.acepted_at,
          p.acepted_by as cozinha,
          STRING_AGG(p2.tipo::TEXT, ', ') AS tpPG,
          STRING_AGG(p2.valor::TEXT, ', ') AS valorPg,
          p2.created_by as recebido_por,
          SUM(CAST(valor_individual AS NUMERIC)) AS total_pago,
          SUM(CASE WHEN p2.tipo = 'Cortesia' THEN CAST(valor_individual AS NUMERIC) ELSE 0 END) AS total_cortesia
      FROM "Encanto".pedido p
      JOIN "Encanto".pagamentos p2 ON p.id = p2.idpedido
      CROSS JOIN LATERAL unnest(string_to_array(p2.valor::TEXT, ', ')) AS valor_individual
      GROUP BY 
          p.id, p.status, p.created_at, p.created_by, p.id_mesa, p.mesa, p.valor, p.obs, p.pedidos, p.acepted_at, p.acepted_by, p2.created_by, p.taxa
  ) AS subquery
  WHERE 
      TO_CHAR(subquery.created_at, 'YYYY-MM') IN ('${messes
        .split(',')
        .join("','")}')
  GROUP BY EXTRACT(MONTH FROM DATE_TRUNC('month', subquery.created_at)), EXTRACT(YEAR FROM subquery.created_at)
  ORDER BY ano ASC, numero_mes ASC;`
    );
  }
}
