import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {
  }

  @Post()
  async createRoom(@Body() createRoomDto: { title: string; description: string }) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  async findAllRooms() {
    return this.roomsService.findAllRooms();
  }
}
