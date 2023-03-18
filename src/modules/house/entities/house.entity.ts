import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Room } from 'src/modules/room/entities/room.entity';

@Entity({ name: 'house' })
export class House {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text')
  @ApiProperty({
    description: 'Address',
    required: true,
    example: 'Avenida 23 #221 e/ Calle L y Calle K',
  })
  address: string;

  @Column('float', {
    default: 0,
  })
  @ApiProperty({
    description: 'House price',
    required: true,
    example: 7900.99,
  })
  price: number;

  @OneToMany(() => Room, (room) => room.House, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  Rooms?: Room[];

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn({ select: false })
  updatedAt: Date; // Last updated date

  @DeleteDateColumn({ select: false })
  deletedAt: Date; // Deletion date
}
