import { Module } from '@nestjs/common';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamentos_entity } from 'src/services/Pagamentos/Pagamentos.entity';
import { PagamentosService } from 'src/services/Pagamentos/pagamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamentos_entity])],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
