import { IsNotEmpty } from 'class-validator';
export class CreateJobDto { 
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    locality: string;

    @IsNotEmpty()
    expire_date: Date;

    @IsNotEmpty()
    posted_by: number;
}