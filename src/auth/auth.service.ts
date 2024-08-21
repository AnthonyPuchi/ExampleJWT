import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    console.log('Login attempt:', loginDto);
    
    const user = await this.usersService.findByEmail(loginDto.institutionalEmail);

    console.log('User found:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}