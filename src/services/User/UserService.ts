import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<any>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findUser(name: string, password: string): Promise<any> {
    const response = await this.userRepository.query(
      `select * from "Encanto".user where "name" = '${name}' and "password" = '${password}'`
    );
    return response;
  }

  async getUserAdm(): Promise<any> {
    const value: User = await this.cacheManager.get('UserAdm');
    if (value) {
      console.log('cache');
      return value;
    }
    const response = await this.userRepository.query(
      `select id,name,categoria,active from "Encanto"."user"`
    );
    console.log('banco');
    await this.cacheManager.set('UserAdm', response, 0);
    return response;
  }

  async updatePassowd(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'update "Encanto".user set  password =$1 where id = $2',
      [categoriaCardapio.password, categoriaCardapio.id]
    );
  }

  async updateAdm(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'update "Encanto".user set active = $1 , categoria = $2 where id = $3',
      [
        categoriaCardapio.active,
        categoriaCardapio.categoria,
        categoriaCardapio.id,
      ]
    );
  }

  async create(categoriaCardapio: User): Promise<User> {
    return this.userRepository.query(
      'insert into "Encanto".user ( name ,categoria,password, id,active) values ($1,$2,$3,$4,$5)',
      [
        categoriaCardapio.name,
        categoriaCardapio.categoria,
        categoriaCardapio.password,
        categoriaCardapio.id,
        categoriaCardapio.active,
      ]
    );
  }
}
