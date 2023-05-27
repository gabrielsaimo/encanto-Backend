import { Body, Controller, Get } from '@nestjs/common';
import { User } from 'src/services/User/User.entity';
import { UserService } from 'src/services/User/UserService';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  @Get()
  async findAll(@Body() data): Promise<User[]> {
    console.log("🚀 ~ file: user.controller.ts:14 ~ UserController ~ findAll ~ data:", data)
    return this.userService.findUser(data.name,data.password);
  }
}
