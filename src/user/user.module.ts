import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/repository/job.repository';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([JobRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
