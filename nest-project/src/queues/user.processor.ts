// src/queues/user.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { UsersService } from '../users/users.service';

@Processor('user')
export class UserProcessor {
  constructor(private readonly usersService: UsersService) {}

  @Process()
  async handleUpdateUserStatus(job: Job) {
    const { userId } = job.data;
    await this.usersService.updateStatus(userId, true);
  }
}
