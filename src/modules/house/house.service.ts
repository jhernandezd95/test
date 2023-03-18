import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { RoomService } from '../room/room.service';
import { Room } from '../room/entities/room.entity';
import { RoomDto } from '../room/dto/room.dto';
import { HouseQueryDto } from './dto/house-query.dto';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    private readonly roomService: RoomService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Destructure createHouseDto to get houseDetails and Rooms
      const { Rooms, ...houseDetails } = createHouseDto;

      // Create new house and save it to the database
      const newHouse = this.houseRepository.create(houseDetails);
      await queryRunner.manager.save(newHouse);

      // Create and save each room to the database
      const roomPromises = Rooms.map(async (room) => {
        const createRoomDto = new RoomDto(newHouse, room.description);
        const newRoom: Room = await this.roomService.create(createRoomDto);
        return queryRunner.manager.save(newRoom);
      });
      await Promise.all(roomPromises);

      // Commit transaction and release query runner
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Return the new house
      return newHouse;
    } catch (e) {
      // Rollback transaction and release query runner on error
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      // Throw a new error with the original error message
      throw new Error(e.message);
    }
  }

  async findAll(query: HouseQueryDto) {
    const { limit, skip, address, priceMin, priceMax } = query;

    // Create a query builder for the House entity
    const queryBuilder = this.houseRepository.createQueryBuilder('house');

    // Apply the 'WHERE' condition for address
    if (address) {
      queryBuilder.where('house.address ILIKE :address', {
        address: `%${address}%`,
      });
    }

    // Apply the 'WHERE' condition for price range
    if (priceMin && priceMax) {
      queryBuilder.andWhere('house.price BETWEEN :priceMin AND :priceMax', {
        priceMin,
        priceMax,
      });
    } else if (priceMin) {
      queryBuilder.andWhere('house.price >= :priceMin', { priceMin });
    } else if (priceMax) {
      queryBuilder.andWhere('house.price <= :priceMax', { priceMax });
    }

    // Apply the 'SKIP' and 'TAKE' options
    queryBuilder.take(limit);
    queryBuilder.skip(skip);

    // Execute the query and return the results
    const houses = await queryBuilder.getMany();
    return houses;
  }

  async findOne(id: string) {
    const house = await this.houseRepository.findOneBy({ id });

    if (!house) {
      throw new NotFoundException(`House with id ${id} not found.`);
    }
    return house;
  }

  async update(id: string, updateHouseDto: UpdateHouseDto) {
    try {
      const house = await this.houseRepository.preload({
        id,
        ...updateHouseDto,
      });

      if (!house) {
        throw new NotFoundException(`House with id ${id} not found.`);
      }

      await this.houseRepository.save(house);

      return house;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.houseRepository.softDelete({ id });
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }
}
