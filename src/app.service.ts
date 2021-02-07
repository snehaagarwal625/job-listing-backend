import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployerRepository } from './repository/employer.repository';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(EmployerRepository)
    private employerRepository: EmployerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  
}
