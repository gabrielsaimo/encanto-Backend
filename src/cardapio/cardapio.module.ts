import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardapioController } from './cardapio.controller';
import { CardapioService } from '../services/CardapioService';
import { Cardapio } from '../services/cardapio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cardapio])],
  controllers: [CardapioController],
  providers: [CardapioService],
})
export class CardapioModule {}
