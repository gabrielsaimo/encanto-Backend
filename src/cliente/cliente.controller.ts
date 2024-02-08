import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente_entity } from './cliente.entity';

@Controller('cliente')
export class CleinteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findUserAdm(): Promise<Cliente_entity> {
    return this.clienteService.getCliente();
  }

  /* @Post()
  async update(@Body() data): Promise<any> {
    return this.clienteService.updatePassowd(data);
  }*/

  @Put()
  async create(@Body() data): Promise<Cliente_entity> {
    return this.clienteService.create(data);
  }
}
