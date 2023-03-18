import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Room description',
    required: true,
    example: 'Description of room',
  })
  description: string;
}
