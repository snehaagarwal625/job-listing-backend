import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplyJobDto } from 'src/dto/apply-job.dto';
import { Job } from 'src/entity/job.entity';
import { JobUser } from 'src/entity/job_user.entity';
import { CreateJobDto } from '../dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  //get api for a job
  @Get()
  getJob(): Promise<Job[]>{
      return this.jobService.getJob()
  }

  // post api for a job
  @Post()
  saveJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(createJobDto);  
  }

  @Post()
  applyJob(@Body() applyJobDto: ApplyJobDto): Promise<JobUser> {
    return this.jobService.applyJob(applyJobDto);  
  }

}
