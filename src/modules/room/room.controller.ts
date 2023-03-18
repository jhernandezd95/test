import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoomService } from './room.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomQueryDto } from './dto/room-query.dto';
import { ErrorDto } from 'src/common/dtos/error.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: [Room],
  })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findAll(@Query() query: RoomQueryDto) {
    return this.roomService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: Room,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated sucessfully',
    type: Room,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted sucessfully',
    type: Room,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
