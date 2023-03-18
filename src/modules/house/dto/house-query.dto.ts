import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class HouseQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'House address',
    required: false,
    example: 'Avenida 23 #221 e/ Calle L y Calle K',
  })
  address?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Price min',
    required: false,
    example: 20,
  })
  priceMin?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Price max',
    required: false,
    example: 2000,
  })
  priceMax?: number;
}
