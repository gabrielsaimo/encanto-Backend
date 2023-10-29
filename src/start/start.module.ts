import { Module } from '@nestjs/common';
import { StartController } from './start.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Start } from 'src/services/Start/start.entity';
import { StartService } from 'src/services/Start/Start.service';

@Module({
  imports: [TypeOrmModule.forFeature([Start])],
  controllers: [StartController],
  providers: [StartService],
})
export class StartModule {}
