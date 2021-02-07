import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entity/user.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const { email, name, location, mobile_no, resume } = createUserDto;
        const user = new User();
        user.email = email;
        user.name = name;
        user.location = location;
        user.mobile_no = mobile_no;
        user.resume = resume
        await user.save();
        return user;
    }

    async updateProfile(user, updateInfo) {
        user.name = updateInfo.name;
        user.email = updateInfo.email;
        user.mobile_no = updateInfo.mobile_no;
        user.location = updateInfo.location;
        user.resume = updateInfo.resume;
        await user.save();
        return user;
    }
}