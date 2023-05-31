import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './Pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<any>,
  ) {}

  async findPedido(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where status not in('Finalizado','Cancelado') ORDER BY created_at DESC;`,
    );
  }
  async findPedidoAdm(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido  order by update_at desc;`,
    );
  }

  async findMessa(): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `SELECT DISTINCT mesa FROM "Encanto".pedido where status not in('Finalizado','Cancelado');`,
    );
  }

  async findPedidoByMesa(mesa: string): Promise<Pedido[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where mesa = $1 and status != 'Finalizado' ORDER BY created_at DESC;`,
      [mesa],
    );
  }

  async postPedidoStatus(data:Pedido): Promise<Pedido[]> {
    if(data.status !== 'Em Preparo' && data.status !== 'Em Cancelamento'){
    return this.pedidoRepository.query(
      `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,finished_by = $4, finished_at = $5 where id = $7`,
      [data.status, data.update_by, data.update_at, data.finished_by, data.finished_at, data.id],
    );

    }else if(data.status === 'Em Cancelamento'){
      return this.pedidoRepository.query(
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,finished_by = $4, finished_at = $5, obs_cancel = $6 where id = $7`,
        [data.status, data.update_by, data.update_at, data.finished_by, data.finished_at, data.obs_cancel, data.id],
      );
    }else{
      return this.pedidoRepository.query(
        `update "Encanto".pedido set status = $1 , update_by = $2 ,update_at = $3,acepted_by = $4 , acepted_at= $5 ,finished_by = $6, finished_at = $7  where id = $9`,
        [data.status, data.update_by, data.update_at, data.acepted_by, data.acepted_at, data.finished_by, data.finished_at, data.id],
      );
    }
  }
  
  
/*
  async update(categoriaCardapio: User): Promise<any> {
    return this.pedidoRepository.query(
      'update "Encanto".categoriacardapio set active = $1 , name = $2 where id = $3',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }

  
*/
async create(data: Pedido): Promise<Pedido> {
  return  this.pedidoRepository.query(
    `INSERT INTO "Encanto".pedido
    (id, created_at, desconto, mesa, obs, pedidos, status, valor, created_by, acepted_by, acepted_at, update_by, finished_by, finished_at, update_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14, $15)`,
    [data.id, data.created_at, data.desconto, data.mesa, data.obs, data.pedidos, data.status, data.valor, data.created_by, data.acepted_by, data.acepted_at, data.update_by, data.finished_by, data.finished_at, data.update_at],
  );
}
}
