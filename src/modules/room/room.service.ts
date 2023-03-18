import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { RoomQueryDto } from './dto/room-query.dto';
import { RoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: RoomDto) {
    try {
      const room = this.roomRepository.create(createRoomDto);
      return room;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  findAll(query: RoomQueryDto) {
    try {
      const { limit, skip, description } = query;

      const where = description
        ? { description: ILike(`%${description}%`) }
        : {};

      const rooms = this.roomRepository.find({
        where,
        take: limit,
        skip,
      });
      return rooms;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findOneBy({ id });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found.`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    try {
      const room = await this.roomRepository.preload({
        id,
        ...updateRoomDto,
      });

      if (!room) {
        throw new NotFoundException(`Room with id ${id} not found.`);
      }

      await this.roomRepository.save(room);

      return room;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.roomRepository.softDelete({ id });
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }
}
