import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class RoomQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description',
    required: false,
    example: 'Description',
  })
  description?: string;
}
