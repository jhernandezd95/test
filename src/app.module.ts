import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { HouseModule } from './modules/house/house.module';
import { RoomModule } from './modules/room/room.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: +process.env.DB_POSTGRES_PORT,
      database: process.env.DB_POSTGRES_NAME,
      username: process.env.DB_POSTGRES_USERNAME,
      password: process.env.DB_POSTGRES_PASS,
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
      logging: true,
      logger: 'file',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    }),
    UserModule,
    RoleModule,
    HouseModule,
    RoomModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
