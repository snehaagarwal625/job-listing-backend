import { IsNotEmpty } from 'class-validator';
export class CreateEmployerOtpDto { 
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobileNo: number;

    @IsNotEmpty()
    otp: number;
}