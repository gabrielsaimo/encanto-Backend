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
}