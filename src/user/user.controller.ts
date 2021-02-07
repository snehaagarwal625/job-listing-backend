import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from './user.service';

@Controller('jobs')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //get api for a user
  @Get()
  getUser(): Promise<User[]>{
      return this.userService.getUser()
  }

  // post api for a user
  @Post()
  saveUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);  
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
