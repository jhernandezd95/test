import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'josue@mail.com',
    uniqueItems: true,
    type: String,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwE123',
    type: String,
  })
  password: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    description: 'Roles id',
    required: true,
    type: String,
    isArray: true,
    example: ['uuid'],
  })
  roleIds: string[];
}
