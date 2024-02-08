import { Module } from '@nestjs/common';
import { CleinteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente_entity } from './cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente_entity])],
  controllers: [CleinteController],
  providers: [ClienteService],
})
export class ClienteModule {}
