/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({ controllers: [UserController] })
export class UserModule {}

// Path: src\user\user.controller.ts
// Compare this snippet from src\user\user.controller.ts:
// import { Controller, Get } from '@nestjs/common';
//
