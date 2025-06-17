import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RequestService } from './request/request.service';
import { RequestModule } from './request/request.module';
import { ApprovalModule } from './approval/approval.module';
import { ItemModule } from './item/item.module';
import { ItemController } from './item/item.controller';
import { Item } from './item/item.entity';
import { Approval } from './approval/approval.entity';
import { User } from './user/user.entity';
import { RequestController } from './request/request.controller';
import { AuthController } from './auth/auth.controller';
import { Request } from './request/request.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UsersController } from './user/users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // this is important
        synchronize: true, // Use migrations in production instead
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RequestModule,
    ItemModule,
    ApprovalModule,
    TypeOrmModule.forFeature([Item, Request, Approval, User]),
  ],
  controllers: [
    AppController,
    ItemController,
    RequestController,
    AuthController,
    UsersController,
  ],
  providers: [AppService, RequestService, AuthService, UserService, JwtService],
})
export class AppModule {}
