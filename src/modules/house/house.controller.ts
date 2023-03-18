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

import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { HouseQueryDto } from './dto/house-query.dto';
import { ErrorDto } from 'src/common/dtos/error.dto';

@ApiTags('house')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created sucessfully',
    type: House,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: [House],
  })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findAll(@Query() query: HouseQueryDto) {
    return this.houseService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returned sucessfully',
    type: House,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updated sucessfully',
    type: House,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(id, updateHouseDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted sucessfully',
    type: House,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorDto })
  @ApiResponse({ status: 404, description: 'Not found', type: ErrorDto })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
    type: ErrorDto,
  })
  remove(@Param('id') id: string) {
    return this.houseService.remove(id);
  }
}
