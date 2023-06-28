import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from 'src/services/User/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/User/UserService';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
