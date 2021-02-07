import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyJobDto } from 'src/dto/apply-job.dto';
import { JobUser } from 'src/entity/job_user.entity';
import { JobUserRepository } from 'src/repository/job_user.repository';
import { CreateJobDto } from '../dto/create-job.dto';
import { Job } from '../entity/job.entity';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class JobsService {

  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
    private jobUserRepository: JobUserRepository
) { }

  async getJob(): Promise<Job[]>{
      return await this.jobRepository.find();
  }
  async createJob(createJobDto: CreateJobDto): Promise<Job>{
    return await this.jobRepository.createJob(createJobDto);
  }

  async applyJob(applyJobDto: ApplyJobDto): Promise<JobUser>{
    return await this.jobUserRepository.applyJob(applyJobDto);
  }
}
