import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Employer } from "./employer.entity";
import { JobUser } from "./job_user.entity";
import { User } from "./user.entity";

@Entity()
export class Job  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    company:string;

    @Column()
    locality:string;

    @Column()
    expire_date: Date;

    @Column()
    posted_by: number;

    @ManyToOne(() => Job )
    @JoinTable({
        name: 'job_user',
        inverseJoinColumn: {
            name: 'fk_user_id',
            referencedColumnName: 'id',
        },
        joinColumn: {
            name: 'fk_job_id',
            referencedColumnName: 'id',
        },
    })
    user: User[];

    @OneToOne(type=> Employer)
    @JoinColumn({name:'posted_by'})
    employer: Employer;

    @OneToMany(type => JobUser, jobUser => jobUser.job)
    @JoinColumn({name: 'id'})
    jobUser: JobUser[];
}