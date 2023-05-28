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

  async create(categoriaCardapio: User): Promise<any> {
    return this.pedidoRepository.query(
      'insert into "Encanto".categoriacardapio (active, name, id) values ($1, $2, $3)',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }
*/
}
