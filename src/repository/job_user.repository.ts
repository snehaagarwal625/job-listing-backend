import { ApplyJobDto } from "src/dto/apply-job.dto";
import { JobUser } from "src/entity/job_user.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(JobUser)
export class JobUserRepository extends Repository<JobUser>{
    async applyJob(applyJobDto: ApplyJobDto): Promise<JobUser>{
        const { jobId, userId, status } = applyJobDto;
        const jobUser = new JobUser();
        jobUser.fk_job_id = jobId;
        jobUser.fk_user_id = userId;
        jobUser.status = status;
        await jobUser.save();
        return jobUser;
    }
}