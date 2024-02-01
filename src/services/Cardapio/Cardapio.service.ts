/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cardapio } from './cardapio.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Aseetes } from './assetes.entity';

@Injectable()
export class CardapioService {
  constructor(
    @InjectRepository(Cardapio)
    @InjectRepository(Aseetes)
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly CardapioRepository: Repository<any>
  ) {}

  async findAll(): Promise<Cardapio> {
    const value: Cardapio = await this.cacheManager.get('Cardapio');
    if (value) {
      console.log('cache');
      return value;
    }
    const response = await this.CardapioRepository.query(
      `SELECT c.id, c."name", c.category, c.description, c.sub, c.price, c.active, c.meia,c.type,c.highlight,
      STRING_AGG(a.id::TEXT, ', ') AS ids
      FROM "Encanto".cardapio c
      LEFT JOIN "Encanto".assetes a ON (c.id = a.idreq)
      GROUP BY c.id, c."name", c.category, c.description, c.sub, c.price, c.active, c.meia,c.type,c.highlight
      ORDER BY c.id;`
    );
    console.log('banco');

    await this.cacheManager.set('Cardapio', response, 0);
    return response;
  }

  async update(cardapio: any): Promise<Cardapio> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'update "Encanto".cardapio set active = $1 , name = $2 , price= $3 , description = $4 , category= $5 , sub = $6 , update_at = $7 , update_by= $8 , meia=$9 , type=$10, highlight=$11 where id = $12',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.meia,
        cardapio.type,
        cardapio.highlight,
        cardapio.id,
      ]
    );
  }

  async create(cardapio: any): Promise<Cardapio> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'insert into "Encanto".cardapio (active, name, price, description, category, sub, update_at,update_by, meia, type,highlight,  id ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12)',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.meia,
        cardapio.type,
        cardapio.highlight,
        cardapio.id,
      ]
    );
  }

  async delete(id: any): Promise<Cardapio> {
    this.cacheManager.set('Cardapio', undefined, 0);
    return await this.CardapioRepository.query(
      'delete from "Encanto".cardapio where id = $1',
      [id]
    );
  }

  async updateImage(data: any): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'update "Encanto".cardapio set imagem = $1 where id = $2',
      [data.imagem, data.id]
    );
  }

  async createImage(data: any): Promise<Aseetes> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      `INSERT INTO "Encanto".assetes
      (id, dados, tipo, idreq)
      VALUES($1, $2, $3, $4);`,
      [data.id, data.imagem, data.tipo, data.idreq]
    );
  }

  async deleteImage(id: any): Promise<Aseetes> {
    await this.cacheManager.del('Assetes');
    return await this.CardapioRepository.query(
      'Delete from "Encanto".assetes where id = $1',
      [id]
    );
  }

  async findImageReq(id: any): Promise<Aseetes> {
    await this.cacheManager.del('Assetes');
    return await this.CardapioRepository.query(
      `select id, idreq, encode(a.dados, 'base64') as imagem from "Encanto".assetes a where idreq = $1`,
      [id]
    );
  }

  async updateImageId(data: any): Promise<any> {
    return await this.CardapioRepository.query(
      'update "Encanto".assetes set dados = $1 where id = $2',
      [data.imagem, data.idreq]
    );
  }
}
