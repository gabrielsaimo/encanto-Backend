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

  async findPedido(): Promise<any[]> {
    return this.pedidoRepository.query(
      `select * from "Encanto".pedido where status != 'Finalizado'`,
    );
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
