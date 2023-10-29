import { Module } from '@nestjs/common';
import { EstoqueController } from './estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from 'src/services/Estoque/Estoque.entity';
import { EstoqueService } from 'src/services/Estoque/Estoque.service';
@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
