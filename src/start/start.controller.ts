import { Controller, Get } from '@nestjs/common';
import { Start } from 'src/services/Start/start.entity';
import { StartService } from 'src/services/Start/StartService';

@Controller('/')
export class StartController {
    constructor(
        private readonly startServer: StartService,
      ) {}
    @Get()
    async findAll(): Promise<Start[]> {
      return this.startServer.findAll();
    }
}
