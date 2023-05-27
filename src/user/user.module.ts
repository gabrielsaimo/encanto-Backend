import { Get, Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController]
})
export class UserModule {
  @Get()
  findAll(): string {
    return 'No AR🚀🚀🚀';
  }
}
