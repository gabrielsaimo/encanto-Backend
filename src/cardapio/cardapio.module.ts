import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardapioController } from './cardapio.controller';
import { CardapioService } from '../services/Cardapio/Cardapio.service';
import { Cardapio } from '../services/Cardapio/cardapio.entity';
import { CardapioResolver } from './cardapio.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cardapio])],
  controllers: [CardapioController],
  providers: [CardapioService, CardapioResolver, CardapioResolver],
})
export class CardapioModule {}
