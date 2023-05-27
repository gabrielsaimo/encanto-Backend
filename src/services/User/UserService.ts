import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<any>,
  ) {}

  async findUser(name:string,password:string): Promise<any> {
    return this.userRepository.query(
      `select * from "Encanto".user where "name" = '${name}' and "password" = '${password}'`,
    );
  }
  
/*
  async update(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'update "Encanto".categoriacardapio set active = $1 , name = $2 where id = $3',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }

  async create(categoriaCardapio: User): Promise<any> {
    return this.userRepository.query(
      'insert into "Encanto".categoriacardapio (active, name, id) values ($1, $2, $3)',
      [categoriaCardapio.active, categoriaCardapio.name, categoriaCardapio.id],
    );
  }
*/
}
