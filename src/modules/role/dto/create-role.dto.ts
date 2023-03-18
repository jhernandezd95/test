import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({
    description: 'Role type',
    required: true,
  })
  role: string;
}
