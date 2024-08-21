import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: { username: string; institutionalEmail: string; password: string }) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        institutionalEmail: createUserDto.institutionalEmail,
        password: hashedPassword,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findByEmail(institutionalEmail: string) {
    return this.prisma.user.findUnique({
      where: { institutionalEmail },
    });
  }
}
