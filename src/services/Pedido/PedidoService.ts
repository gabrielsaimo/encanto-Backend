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
      `select * from "Encanto".pedido where status not in('Finalizado','Cancelado') ORDER BY created_at DESC;`
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
      `update "Encanto".mesa set status = 'Fechado' ,tipo_pagamento = $1 ,obs =$2 ,closed_at =$3,closed_by =$4, valor =$5 where id = $6`,
      [
        data.tipo_pagamento,
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
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,finished_by = $4, finished_at = $5 where id = $6`,
        [
          data.status,
          data.update_by,
          data.update_at,
          data.finished_by,
          data.finished_at,
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
    (id, created_at, desconto, mesa, id_mesa, obs, pedidos, status, valor, created_by, acepted_by, acepted_at, update_by, finished_by, finished_at, update_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14, $15, $16)`,
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
      `INSERT INTO "Encanto".pedidos_uni (id, qdt, item, valor, categoria, obs, idpedido , iditem,idmesa) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        data.id,
        data.qdt,
        data.item,
        data.valor,
        data.categoria,
        data.obs,
        data.idpedido,
        data.iditem,
        data.idmesa,
      ]
    );
  }

  async getPedidos_unit(id: number): Promise<any> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedidos_uni p where p.id = $1 ;`,
      [id]
    );
  }

  async getPedidos(): Promise<any> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedidos_uni p ;`
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
}
