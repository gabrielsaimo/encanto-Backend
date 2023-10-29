import { Module } from '@nestjs/common';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamentos } from 'src/services/Pagamentos/Pagamentos.entity';
import { PagamentosService } from 'src/services/Pagamentos/Pagamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamentos])],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
