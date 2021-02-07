import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerRepository } from 'src/repository/employer.repository';
import { UserRepository } from 'src/repository/user.repository';
import { MailService } from 'src/shared/email.service';
import { EmployersController } from './employer.controller';
import { EmployersService } from './employer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([EmployerRepository, UserRepository])
  ],
  controllers: [EmployersController],
  providers: [EmployersService, MailService ],
})
export class EmployersModule {}
