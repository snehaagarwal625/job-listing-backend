import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/repository/job.repository';
import { JobUserRepository } from 'src/repository/job_user.repository';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([JobRepository, JobUserRepository])
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
