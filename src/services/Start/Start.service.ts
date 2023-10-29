/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Start } from './start.entity';

@Injectable()
export class StartService {
  constructor(
    @InjectRepository(Start)
    private readonly startService: Repository<any>
  ) {}

  async findAll(): Promise<any[]> {
    return ['No Ar 🚀🚀🚀'];
  }
}
