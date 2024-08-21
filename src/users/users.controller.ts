import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: { username: string; institutionalEmail: string; password: string }) {
    return this.usersService.createUser(createUserDto);
  }
  
  @Get()
  //@UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAllUsers();
  }
}
