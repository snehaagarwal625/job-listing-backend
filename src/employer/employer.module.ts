import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/repository/job.repository';
import { EmployersController } from './employer.controller';
import { EmployersService } from './employer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([JobRepository])
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
})
export class EmployersModule {}
