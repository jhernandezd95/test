import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';

import { Role } from 'src/modules/role/entities/role.entity';
import { hashPassword } from '../utils/password.utils';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'josue@mail.com',
  })
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456a',
  })
  password: string;

  @ManyToMany(() => Role, (role) => role.Users, { eager: true })
  @JoinTable({
    name: 'user_role',
  })
  Roles: Role[];

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn({ select: false })
  updatedAt: Date; // Last updated date

  @DeleteDateColumn({ select: false })
  deletedAt: Date; // Deletion date

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
