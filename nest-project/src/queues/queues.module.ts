import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserProcessor } from './user.processor';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-yet';

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
    CacheModule.register({
      store: redisStore as any,
      host: 'localhost',
      port: 6379,
      ttl: 1800,  // 30 минут
    }),
  ],
  providers: [UserProcessor, UsersService],
  exports: [BullModule, UsersService],
})
export class QueuesModule {}
