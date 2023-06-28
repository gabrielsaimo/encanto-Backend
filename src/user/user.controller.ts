import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { User } from 'src/services/User/User.entity';
import { UserService } from 'src/services/User/UserService';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async findAll(@Body() data): Promise<User> {
    return this.userService.findUser(data.name, data.password);
  }

  @Get('adm')
  async findUserAdm(): Promise<User> {
    return this.userService.getUserAdm();
  }

  @Post('update')
  async update(@Body() data): Promise<any> {
    return this.userService.updatePassowd(data);
  }

  @Post('adm')
  async updateAdm(@Body() data): Promise<any> {
    return this.userService.updateAdm(data);
  }

  @Put()
  async create(@Body() data): Promise<User> {
    return this.userService.create(data);
  }
}
