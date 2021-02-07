import { Body, Controller, Get, NotFoundException, Patch, Post, Req } from '@nestjs/common';
import { CreateEmployerOtpDto } from 'src/dto/create-employer-otp.dto';
import { CreateEmployerDto } from 'src/dto/create-employer.dto';
import { Employer } from 'src/entity/employer.entity';
import { MailService } from 'src/shared/email.service';
import { EmployersService } from './employer.service';

@Controller('employers')
export class EmployersController {
    constructor(private readonly employersService: EmployersService,
        private readonly mailService: MailService) { }
    employer = [];
    login =[];
    //get api for a employer
    @Get()
    getJob(): Promise<Employer[]> {
        return this.employersService.getEmployer();
    }

    // post api for a employer
    @Post('register')
    saveJob(@Body() createEmployerDto: CreateEmployerDto,) {
        console.log("createEmployerDto", createEmployerDto);

        let otp = Math.random();
        otp = otp * 1000000;
        otp = Math.round(otp);
        console.log(otp);
        createEmployerDto["otp"] = otp;
        this.employer.push(createEmployerDto);
        console.log(this.employer);
        //send email
        this.mailService.SendEmail(this.mailService.generateMailingInput(otp, createEmployerDto.email))
    }

    @Post('register-otp')
    saveJobWithOtp(@Body() createEmployerOtpDto: CreateEmployerOtpDto) {
        const { name, email, mobileNo, otp } = createEmployerOtpDto;
        this.employer.forEach((ele) => {
            if (ele.email === createEmployerOtpDto.email &&
                ele.name === createEmployerOtpDto.name &&
                ele.mobileNo === createEmployerOtpDto.mobileNo) {
                if (ele.otp === createEmployerOtpDto.otp) {
                    return this.employersService.createEmployer({ name, email, mobileNo });
                }
                else throw new NotFoundException(`otp incorrect`);
            }
        })
    }

    // edit employers profile
    @Patch('/:id')
    editProfile(@Req() req,
        @Body() updateInfo: CreateEmployerDto
    ) {
        return this.employersService.updateProfile(req, updateInfo);
    }

    @Post('\verify-login')
    verifyEmail(@Body() email) {
      return this.employersService.verifyEmail(email);
    }

    @Post('\login')
    verifyOtp(@Body() loginInput) {
      return this.employersService.verifyOtp(loginInput);
    }

}
