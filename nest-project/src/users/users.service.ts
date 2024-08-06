import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updateStatus(id: number, status: boolean): Promise<void> {
    await this.usersRepository.update(id, { status });
  }

  async findById(id: number): Promise<User | undefined> {
    const cachedUser = await this.cacheManager.get<User>(`user_${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.cacheManager.set(`user_${id}`, user, 1800);
    }
    return user;
  }
}
