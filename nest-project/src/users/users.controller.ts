import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectQueue('user') private readonly userQueue: Queue,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const newUser = await this.usersService.create(user);

    await this.userQueue.add({ userId: newUser.id }, { delay: 10000 });
    
    return newUser;
  }
}
