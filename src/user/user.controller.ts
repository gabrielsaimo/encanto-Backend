import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
@Controller('user')
export class UserController {
  @Get()
  getUser(): string {
    return JSON.stringify({ message: 'Hello World!' });
  }
  @Post()
  async PostUser(@Body() createUserDto: CreateUserDto) {
    return { ...createUserDto };
  }
}
