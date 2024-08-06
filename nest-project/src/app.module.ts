import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { QueuesModule } from './queues/queues.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user1',
      password: 'user1user',
      database: 'main',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      store: redisStore as any,
      host: 'localhost',
      port: 6379,
      ttl: 1800,  // 30 минут
    }),
    UsersModule,
    QueuesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
