import { CreateEmployerDto } from "src/dto/create-employer.dto";
import { Employer } from "src/entity/employer.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Employer)
export class EmployerRepository extends Repository<Employer>{
    async createEmployer(createEmloyerDto: CreateEmployerDto): Promise<Employer>{
        const { name, email, mobileNo } = createEmloyerDto;
        const employer = new Employer();
        employer.name = name;
        employer.email = email;
        employer.mobileNo = mobileNo;
        await employer.save();
        return employer;
    }

    async updateProfile(employer, updateInfo) {
        employer.name = updateInfo.name;
        employer.email = updateInfo.email;
        employer.mobileNo = updateInfo.mobileNo;
        await employer.save();
        return employer;
    }
}