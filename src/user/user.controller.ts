import { Body, Controller, Get, NotFoundException, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { MailService } from 'src/shared/email.service';
import { UsersService } from './user.service';

@Controller('jobs')
export class UsersController {
  constructor(private readonly userService: UsersService,
    private readonly mailService: MailService) {}
  user = [];

  //get api for a user
  @Get()
  getUser(): Promise<User[]>{
      return this.userService.getUser()
  }

  // post api for a user
  @Post()
  saveUser(@Body() createUserDto: CreateUserDto,) {
        console.log("createUserDto", createUserDto);

        let otp = Math.random();
        otp = otp * 1000000;
        otp = Math.round(otp);
        console.log(otp);
        createUserDto["otp"] = otp;
        this.user.push(createUserDto);
        console.log(this.user);
        //send email
        this.mailService.SendEmail(this.mailService.generateMailingInput(otp, createUserDto.email))
    }

    @Post()
    saveUserWithOtp(@Body() createUserOtpDto) {
        const { name, email, mobile_no, location, resume, otp } = createUserOtpDto;
        this.user.forEach((ele) => {
            if (ele.email === createUserOtpDto.email &&
                ele.name === createUserOtpDto.name &&
                ele.mobile_no === createUserOtpDto.mobileNo &&
                ele.location === createUserOtpDto.location) {
                if (ele.otp === createUserOtpDto.otp) {
                    return this.userService.createUser({ name, email, mobile_no, location, resume});
                }
                else throw new NotFoundException(`otp incorrect`);
            }
        })
    }

  // edit user profile
  @Patch('/:id')
  editProfile(@Req() req,
      @Body() updateInfo: CreateUserDto
  ) {
      return this.userService.updateProfile(req, updateInfo);
  }

  @Get('/:id')
  getUserByJob(
      @Req() req
  ): Promise<User[]>{
      return this.userService.getUserByJob(req)
  }


}
