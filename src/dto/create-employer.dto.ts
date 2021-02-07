import { IsNotEmpty } from 'class-validator';
export class CreateEmployerDto { 
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobileNo: number;
}