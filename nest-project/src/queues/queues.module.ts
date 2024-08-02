// src/queues/queues.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserProcessor } from './user.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost', 
        port: 6379,        
      },
    }),
    BullModule.registerQueue({
      name: 'user',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserProcessor, UsersService],
  exports: [BullModule, UsersService],
})
export class QueuesModule {}
