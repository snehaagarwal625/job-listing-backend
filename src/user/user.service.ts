import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { JobUserRepository } from 'src/repository/job_user.repository';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(JobUserRepository)
    private jobUserRepository: JobUserRepository,
) { }

  async getUser(): Promise<User[]>{
      return await this.userRepository.find();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User>{
    return await this.userRepository.createUser(createUserDto);
  }
  async updateProfile(req, updateInfo){
    if(req.params && req.params.id && updateInfo){
        const found = await this.userRepository.findOne(req.params.id);
        if (!found) {
            throw new NotFoundException(`User with "${req.params.id}" not found`);
        }
        else return await this.userRepository.updateProfile(found, updateInfo);
    }
  }

  async getUserByJob(req){
    if(req.params && req.params.id){
        const found = await this.jobUserRepository.find(req.params.id);
        if(found){
            return await this.userRepository.findByIds(found);
        }
        else throw new NotFoundException(`JobUser with "${req.params.id}" not found`);
    }
  }
}
