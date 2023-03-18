import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { RoomModule } from '../room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './entities/house.entity';

@Module({
  controllers: [HouseController],
  providers: [HouseService],
  imports: [TypeOrmModule.forFeature([House]), RoomModule],
})
export class HouseModule {}
