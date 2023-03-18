import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  @ApiProperty({
    description: 'Role assigned to user',
    required: true,
  })
  role: string;

  @ManyToMany(() => User, (user) => user.Roles, {
    cascade: true,
  })
  Users: User[];

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn({ select: false })
  updatedAt: Date; // Last updated date

  @DeleteDateColumn({ select: false })
  deletedAt: Date; // Deletion date
}
