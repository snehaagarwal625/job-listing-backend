import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployerDto } from 'src/dto/create-employer.dto';
import { Employer } from 'src/entity/employer.entity';
import { EmployerRepository } from 'src/repository/employer.repository';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class EmployersService {

  constructor(
    @InjectRepository(JobRepository)
    private employerRepository: EmployerRepository,
) { }

  async getEmployer(): Promise<Employer[]>{
      return await this.employerRepository.find();
  }
  async createEmployer(createEmployerDto: CreateEmployerDto): Promise<Employer>{
    return await this.employerRepository.createEmployer(createEmployerDto);
  }

  async updateProfile(req, updateInfo){
    if(req.params && req.params.id && updateInfo){
        const found = await this.employerRepository.findOne(req.params.id);

        if (!found) {
            throw new NotFoundException(`Employer with "${req.params.id}" not found`);
        }
        else return await this.employerRepository.updateProfile(found, updateInfo);
    }
  }
}
