import { isNotEmpty, IsNotEmpty } from 'class-validator';
export class CreateUserDto { 
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    mobile_no: number;

    @IsNotEmpty()
    resume: string;
}