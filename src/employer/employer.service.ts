import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployerDto } from 'src/dto/create-employer.dto';
import { Employer } from 'src/entity/employer.entity';
import { EmployerRepository } from 'src/repository/employer.repository';
import { UserRepository } from 'src/repository/user.repository';
import { MailService } from 'src/shared/email.service';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class EmployersService {
  login = [];
  constructor(
    @InjectRepository(EmployerRepository)
    private employerRepository: EmployerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly mailService: MailService
) { }

  async getEmployer(): Promise<Employer[]>{
      return await this.employerRepository.find();
  }
  async createEmployer(createEmployerDto: CreateEmployerDto): Promise<Employer>{
    return await this.employerRepository.createEmployer(createEmployerDto);
  }

  async updateProfile(req, updateInfo){
    if(req.params && req.params.id && updateInfo){
        const found = await this.employerRepository.findOne(req.params.id);

        if (!found) {
            throw new NotFoundException(`Employer with "${req.params.id}" not found`);
        }
        else return await this.employerRepository.updateProfile(found, updateInfo);
    }
  }

  async verifyEmail(email) {
    let found;
    found = await this.employerRepository.find({
      where: {email:email.email}
    });
    if(!found){
      found = await this.userRepository.find({
        where: {email:email.email}
      });
    }
    if(found){
      let otp = Math.random();
      otp = otp * 1000000;
      otp = Math.round(otp);
      this.login.push ({email:email.email, otp:otp })
      this.mailService.SendEmail(this.mailService.generateMailingInput(otp, email.email))
    }
  }

  async verifyOtp(input) {
        this.login.forEach((ele) => {
            if (ele.email === input.email ) {
                if (ele.otp === input.otp) {
                    return 'correct otp';
                }
                else throw new NotFoundException(`otp incorrect`);
            }
        })
  }
}
