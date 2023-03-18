import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(role);
      return role;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  findAll(query: RoleQueryDto) {
    const { limit, skip } = query;

    const users = this.roleRepository.find({
      take: limit,
      skip,
    });
    return users;
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.preload({
        id,
        ...updateRoleDto,
      });

      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found.`);
      }

      await this.roleRepository.save(role);

      return role;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.roleRepository.softDelete({ id });
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }
}
