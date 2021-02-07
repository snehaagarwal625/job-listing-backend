import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/repository/job.repository';
import { JobUserRepository } from 'src/repository/job_user.repository';
import { UserRepository } from 'src/repository/user.repository';
import { MailService } from 'src/shared/email.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository, JobUserRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService, MailService],
})
export class UsersModule {}
