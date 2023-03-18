import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { RoleService } from '../role/role.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { roleIds, ...userDetails } = createUserDto;

      const user = this.userRepository.create(userDetails);

      const roles = [];
      const rolesPromises = roleIds.map(async (roleId) => {
        const role = await this.roleService.findOne(roleId);
        roles.push(role);
      });

      await Promise.all(rolesPromises);

      user.Roles = roles;

      await this.userRepository.save(user);
      return user;
    } catch (e) {
      const error = new Error(e.detail || e.message);
      throw error;
    }
  }

  async findAll(query: UserQueryDto) {
    const { limit, skip, email } = query;

    const where = email ? { email: ILike(`%${email}%`) } : {};

    const users = await this.userRepository.find({
      where,
      take: limit,
      skip,
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      delete updateUserDto.password;

      const user = await this.userRepository.preload({
        id,
        ...updateUserDto,
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }

      await this.userRepository.save(user);

      return user;
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.softDelete({ id });
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  }
}
