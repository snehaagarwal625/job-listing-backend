import { OpenDirOptions } from "fs";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { JobStatus } from "../enum/status.enum";
import { Job } from "./job.entity";

@Entity()
export class JobUser  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fk_job_id:string;

    @Column()
    fk_user_id:string;

    @Column()
    status: JobStatus;

    @ManyToOne(type => Job, job => job.jobUser)
    @JoinColumn({name: 'fk_job_id'})
    job: Job;

}