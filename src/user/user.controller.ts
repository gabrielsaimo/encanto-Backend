import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  findAll(): string {
    return 'List of users';
  }
}
