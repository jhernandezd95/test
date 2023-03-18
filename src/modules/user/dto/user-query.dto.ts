import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class UserQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'email',
    required: false,
    example: 'email',
  })
  email?: string;
}
