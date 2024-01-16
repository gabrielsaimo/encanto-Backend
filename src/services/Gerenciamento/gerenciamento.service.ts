import { Inject, Injectable } from '@nestjs/common';
import { Gerenciamento_entity } from './gerenciamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class GerenciamentoService {
  constructor(
    @InjectRepository(Gerenciamento_entity)
    private readonly GerenciamentoRepository: Repository<Gerenciamento_entity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findBairro(): Promise<Gerenciamento_entity> {
    const value: any = await this.cacheManager.get('Bairros');
    if (value) {
      return value;
    }
    const response = await this.GerenciamentoRepository.query(
      'select * from "Encanto".bairros order by id'
    );
    await this.cacheManager.set('Bairros', response, 0);
    return response;
  }

  async update(bairro: any): Promise<any> {
    await this.cacheManager.del('Bairros');
    return this.GerenciamentoRepository.query(
      'update "Encanto".bairros set active = $1 , name = $2 , price = $3 where id = $4',
      [bairro.active, bairro.name, bairro.price, bairro.id]
    );
  }

  async createBairro(bairro: any): Promise<any> {
    await this.cacheManager.del('Bairros');
    return this.GerenciamentoRepository.query(
      'insert into "Encanto".bairros ( name, price, id) values ($1, $2, $3)',
      [bairro.name, bairro.price, bairro.id]
    );
  }

  async delete(bairro: any): Promise<any> {
    await this.cacheManager.del('Bairros');
    return this.GerenciamentoRepository.query(
      'delete from "Encanto".bairros where id = $1',
      [bairro]
    );
  }

  async findEmail(): Promise<any> {
    const value: any = await this.cacheManager.get('Email');
    if (value) {
      return value;
    }
    const response = this.GerenciamentoRepository.query(
      'select * from "Encanto".email'
    );
    await this.cacheManager.set('Email', response, 0);
    return response;
  }

  async createEmail(email: any): Promise<any> {
    await this.cacheManager.del('Email');
    return this.GerenciamentoRepository.query(
      'insert into "Encanto".email (mail,name,type,active,id) values ($1, $2, $3, $4, $5)',
      [email.mail, email.name, email.type, email.active, email.id]
    );
  }

  async updateEmail(email: any): Promise<any> {
    await this.cacheManager.del('Email');
    return this.GerenciamentoRepository.query(
      'update "Encanto".email set  type = $1  where id = $2',
      [email.type, email.id]
    );
  }

  async deleteEmail(id: number): Promise<any> {
    await this.cacheManager.del('Email');
    return this.GerenciamentoRepository.query(
      'delete from "Encanto".email where id = $1',
      [id]
    );
  }

  async getDados(): Promise<any> {
    const value: any = await this.cacheManager.get('Dados');
    if (value) {
      return value;
    }
    const response = this.GerenciamentoRepository.query(
      'select * from "Encanto".dados_gerais'
    );
    await this.cacheManager.set('Dados', response, 0);
    return response;
  }
}
