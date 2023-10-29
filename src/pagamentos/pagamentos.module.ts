import { Module } from '@nestjs/common';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from 'src/services/pagamentos/Pagamentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamentos } from 'src/services/pagamentos/Pagamentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamentos])],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
