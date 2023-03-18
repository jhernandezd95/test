import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ErrorDto {
  @ApiProperty({
    description: 'Status code throwed',
    required: true,
  })
  @Type(() => Number)
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'Date and time the error occurred',
    required: false,
  })
  @Type(() => String)
  timestamp: string;

  @ApiProperty({
    description: 'Path',
    required: false,
  })
  @Type(() => String)
  path: string;

  @ApiProperty({
    description: 'Details error',
    required: false,
  })
  details: any;

  constructor(
    status: HttpStatus,
    timestamp: string,
    path: string,
    details: any,
  ) {
    this.statusCode = status;
    this.timestamp = timestamp;
    this.path = path;
    this.details = details;
  }
}
