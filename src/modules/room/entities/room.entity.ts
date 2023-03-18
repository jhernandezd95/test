import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { House } from 'src/modules/house/entities/house.entity';

@Entity({ name: 'room' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text')
  @ApiProperty({
    description: 'Room description',
    required: true,
    example: 'Description',
  })
  description: string;

  @ManyToOne(() => House, (house) => house.Rooms, { nullable: false })
  @JoinColumn({ name: 'houseId', referencedColumnName: 'id' })
  House: House;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn({ select: false })
  updatedAt: Date; // Last updated date

  @DeleteDateColumn({ select: false })
  deletedAt: Date; // Deletion date
}
