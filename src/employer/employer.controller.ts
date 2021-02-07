import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { CreateEmployerDto } from 'src/dto/create-employer.dto';
import { Employer } from 'src/entity/employer.entity';
import { EmployersService } from './employer.service';

@Controller('employers')
export class EmployersController {
    constructor(private readonly employersService: EmployersService) { }

    //get api for a employer
    @Get()
    getJob(): Promise<Employer[]> {
        return this.employersService.getEmployer();
    }

    // post api for a employer
    @Post()
    saveJob(@Body() createEmployerDto: CreateEmployerDto): Promise<Employer> {
        return this.employersService.createEmployer(createEmployerDto);
    }

    // edit employers profile
    @Patch('/:id')
    editProfile(@Req() req,
        @Body() updateInfo: CreateEmployerDto
    ) {
        return this.employersService.updateProfile(req, updateInfo);
    }

}
