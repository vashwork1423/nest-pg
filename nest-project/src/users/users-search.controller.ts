import { Controller, Query, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller()
export class UsersSearchController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('get-user-by-id')
  async findById(@Query('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {

    }

    const user = await this.usersService.findById(userId);
    if (!user) {

    }

    return user;
  }
}
