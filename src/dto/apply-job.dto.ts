import { IsNotEmpty } from 'class-validator';
import { JobStatus } from 'src/enum/status.enum';
export class ApplyJobDto { 
    @IsNotEmpty()
    jobId: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    status: JobStatus;
}