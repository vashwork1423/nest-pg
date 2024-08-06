import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { UserMiddleware } from './middleware/user.middleware';
import { QueuesModule } from 'src/queues/queues.module';
import { UsersSearchController } from './users-search.controller';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-yet';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    QueuesModule,
    CacheModule.register({
      store: redisStore as any,
      host: 'localhost',
      port: 6379,
      ttl: 1800,  // 30 минут
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController, UsersSearchController],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('user');
  }
}
