import { Module } from '@nestjs/common';
import { CardapioController } from './cardapio.controller';

@Module({
  controllers: [CardapioController]
})
export class CardapioModule {}
