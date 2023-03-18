import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

import { CreateRoomDto } from 'src/modules/room/dto/create-room.dto';

export class CreateHouseDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'House address',
    required: true,
    example: 'Avenida 23 #221 e/ Calle L y Calle K',
    type: String,
  })
  address: string;

  @IsNumber()
  @ApiProperty({
    description: 'House price',
    required: true,
    example: 7900.99,
    type: Number,
  })
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'List all rooms',
    required: true,
    isArray: true,
    type: CreateRoomDto,
  })
  Rooms: CreateRoomDto[];
}
