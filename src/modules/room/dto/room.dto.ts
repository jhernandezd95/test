import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { House } from 'src/modules/house/entities/house.entity';

export class RoomDto {
  @ApiProperty({
    description: 'House',
    required: true,
  })
  House: House;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Room description',
    required: true,
    example: 'Description',
  })
  description: string;

  constructor(House: House, description: string) {
    this.House = House;
    this.description = description;
  }
}
