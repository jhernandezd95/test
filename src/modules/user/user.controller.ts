import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQueryDto } from './dto/user-query.dto';
import { ErrorDto } from 'src/common/dtos/error.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created sucessfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Created sucessfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  createWithSpecificRole(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: [User],
  })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated sucessfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted sucessfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
