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

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleQueryDto } from './dto/role-query.dto';
import { ErrorDto } from 'src/common/dtos/error.dto';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created sucessfully',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: [Role],
  })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findAll(@Query() query: RoleQueryDto) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated sucessfully',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted sucessfully',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
