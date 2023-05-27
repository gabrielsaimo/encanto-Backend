import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/services/User/User.entity';
import { UserService } from 'src/services/User/UserService';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  @Post()
  async findAll(@Body() data): Promise<User[]> {
    return this.userService.findUser(data.name,data.password);
  }
}
