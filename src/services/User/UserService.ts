import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(name:string,password:string): Promise<User> {
    return this.userRepository.query(
      `select * from "Encanto".user where "name" = '${name}' and "password" = '${password}'`,
    );
  }

  async getUserAdm(): Promise<any> {
    return this.userRepository.query(
      `select id,name,categoria,active from "Encanto"."user"`,
    );
  }
  

  async updatePassowd(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'update "Encanto".user set  password =$1 where id = $2',
      [categoriaCardapio.password, categoriaCardapio.id],
    );
  }

  async updateAdm(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'update "Encanto".user set active = $1 , categoria = $2 where id = $3',
      [categoriaCardapio.active, categoriaCardapio.categoria , categoriaCardapio.id],
    );
  }

async create(categoriaCardapio: User): Promise<User> {
  return this.userRepository.query(
    'insert into "Encanto".user ( name ,categoria , id) values ($1, $2, $3)',
    [categoriaCardapio.name,categoriaCardapio.categoria  , categoriaCardapio.id],
  );
}
}
