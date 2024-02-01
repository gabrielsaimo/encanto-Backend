import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GerenciamentoService } from 'src/services/Gerenciamento/gerenciamento.service';
import { validate } from 'class-validator';
@Controller('gerenciamento')
export class GerenciamentoController {
  constructor(private readonly gerenciamentoService: GerenciamentoService) {}

  @Get('/bairros')
  async findBairros(): Promise<any> {
    try {
      return this.gerenciamentoService.findBairro();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/bairros')
  async createBairros(@Body() bairro: any): Promise<any> {
    const errors = await validate(bairro);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.gerenciamentoService.createBairro(bairro);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Post('/bairros')
  async updateBairros(@Body() bairro: any): Promise<any> {
    const errors = await validate(bairro);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.gerenciamentoService.update(bairro);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete('/bairros/:id')
  async deleteBairros(@Param() id: any): Promise<any> {
    try {
      return this.gerenciamentoService.delete(id.id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/email')
  async findEmail(): Promise<any> {
    try {
      return this.gerenciamentoService.findEmail();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/email')
  async createEmail(@Body() email: any): Promise<any> {
    const errors = await validate(email);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.gerenciamentoService.createEmail(email);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Post('/email')
  async updateEmail(@Body() email: any): Promise<any> {
    const errors = await validate(email);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.gerenciamentoService.updateEmail(email);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete('/email/:id')
  async deleteEmail(@Param() id: any): Promise<any> {
    try {
      return this.gerenciamentoService.deleteEmail(id.id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/dados')
  async findDados(): Promise<any> {
    try {
      return this.gerenciamentoService.getDados();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/dados')
  async updateDados(@Body() dados: any): Promise<any> {
    const errors = await validate(dados);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    } else {
      try {
        return this.gerenciamentoService.postDados(dados);
      } catch (error: any) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
