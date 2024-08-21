import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(createRoomDto: { title: string; description: string }) {
    return this.prisma.room.create({
      data: {
        title: createRoomDto.title,
        description: createRoomDto.description,
      },
    });
  }

  async findAllRooms() {
    return this.prisma.room.findMany();
  }

}
