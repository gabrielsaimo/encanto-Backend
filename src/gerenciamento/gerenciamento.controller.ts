import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GerenciamentoService } from 'src/services/Gerenciamento/gerenciamento.service';

@Controller('gerenciamento')
export class GerenciamentoController {
  constructor(private readonly gerenciamentoService: GerenciamentoService) {}

  @Get('/bairros')
  async findBairros(): Promise<any> {
    return this.gerenciamentoService.findBairro();
  }

  @Put('/bairros')
  async createBairros(@Body() bairro: any): Promise<any> {
    return this.gerenciamentoService.createBairro(bairro);
  }

  @Post('/bairros')
  async updateBairros(@Body() bairro: any): Promise<any> {
    return this.gerenciamentoService.update(bairro);
  }

  @Delete('/bairros/:id')
  async deleteBairros(@Param() id: any): Promise<any> {
    return this.gerenciamentoService.delete(id.id);
  }

  @Get('/email')
  async findEmail(): Promise<any> {
    return this.gerenciamentoService.findEmail();
  }

  @Put('/email')
  async createEmail(@Body() email: any): Promise<any> {
    return this.gerenciamentoService.createEmail(email);
  }

  @Post('/email')
  async updateEmail(@Body() email: any): Promise<any> {
    return this.gerenciamentoService.updateEmail(email);
  }

  @Delete('/email/:id')
  async deleteEmail(@Param() id: any): Promise<any> {
    return this.gerenciamentoService.deleteEmail(id.id);
  }
}
