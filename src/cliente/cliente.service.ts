/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente_entity } from './cliente.entity';
@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente_entity)
    private readonly clienteRepository: Repository<any>
  ) {}

  async getCliente(): Promise<any> {
    const response = await this.clienteRepository.query(
      `select * from "Encanto".clinteslist`
    );
    return response;
  }

  async GetValidarCliente(phone: number): Promise<any> {
    const response = await this.clienteRepository.query(
      `select * from "Encanto".clinteslist where phone = $1`,
      [phone]
    );
    if (!response || response.length === 0) {
      return { valido: true };
    }
    return { valido: false };
  }

  async create(body: Cliente_entity): Promise<Cliente_entity> {
    return this.clienteRepository.query(
      'insert into "Encanto".clinteslist ( name ,category,phone,active) values ($1,$2,$3,$4)',
      [body.name, body.category, body.phone, body.active]
    );
  }
}
