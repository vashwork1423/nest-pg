import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestException('Name and email are required');
    }

    const user = await this.usersService.findByEmail(email);

    if(user){
      throw new BadRequestException('ERR_USER_EMAIL_EXISTS');
    }

    next();
  }
}
