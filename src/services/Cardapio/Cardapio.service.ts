/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cardapio } from './cardapio.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Observable } from 'rxjs';
@Injectable()
export class CardapioService implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.setTimeout(600000);

    return next.handle();
  }
  constructor(
    @InjectRepository(Cardapio)
    private readonly CardapioRepository: Repository<any>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll(): Promise<Cardapio> {
    const value: Cardapio = await this.cacheManager.get('Cardapio');
    if (value) {
      console.log('cache');
      return value;
    }
    const response = await this.CardapioRepository.query(
      `select c.*,encode(c.imagem, 'base64') as img from "Encanto".cardapio c order by id`
    );
    console.log('banco');
    await this.cacheManager.set('Cardapio', response, 0);
    return response;
  }

  async update(cardapio: any): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'update "Encanto".cardapio set active = $1 , name = $2 , price= $3 , description = $4 , category= $5 , sub = $6 , update_at = $7 , update_by= $8 where id = $9',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.id,
      ]
    );
  }

  async create(cardapio: any): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'insert into "Encanto".cardapio (active, name, price, description, category, sub, update_at,update_by,  id ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        cardapio.active,
        cardapio.name,
        cardapio.price,
        cardapio.description,
        cardapio.category,
        cardapio.sub,
        cardapio.update_at,
        cardapio.update_by,
        cardapio.id,
      ]
    );
  }

  async delete(id: any): Promise<void> {
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

  async createImage(data: any): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      `INSERT INTO "Encanto".assetes
      (id, dados, tipo, idreq)
      VALUES(nextval('assetes_id_seq'::regclass), decode($2,'hex'), $3, $4);`,
      [null, data.imagem, data.id, data.idreq]
    );
  }

  async deleteImage(id: any): Promise<any> {
    await this.cacheManager.del('Cardapio');
    return await this.CardapioRepository.query(
      'update "Encanto".assetes set imagem = null where id = $1',
      [id]
    );
  }

  async findImageReq(id: any): Promise<any> {
    return await this.CardapioRepository.query(
      `select encode(dados, 'base64') as imagem from "Encanto".assetes where idreq = $1`,
      [id]
    );
  }

  async updateImageId(data: any): Promise<any> {
    return await this.CardapioRepository.query(
      'update "Encanto".assetes set dados = $1 where id = $2',
      [data.imagem, data.id]
    );
  }
}
