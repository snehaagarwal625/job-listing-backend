import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { EmployersModule } from './employer/employer.module';
import { UsersModule } from './user/user.module';
import { EmployerRepository } from './repository/employer.repository';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JobsModule,
    EmployersModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, EmployerRepository, UserRepository],
})
export class AppModule {}
