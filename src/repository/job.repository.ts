import { CreateJobDto } from "src/dto/create-job.dto";
import { Job } from "src/entity/job.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Job)
export class JobRepository extends Repository<Job>{
    async createJob(createJobDto: CreateJobDto): Promise<Job>{
        const { title, description, locality, expire_date, posted_by } = createJobDto;
        const job = new Job();
        job.title = title;
        job.description = description;
        job.expire_date = expire_date;
        job.locality = locality;
        job.posted_by = posted_by;
        await job.save();
        return job;
    }
}