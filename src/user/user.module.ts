import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 This is required!
  providers: [UserService],
  exports: [UserService], // <-- Export here so other modules can import it
  controllers: [UsersController],
})
export class UserModule {}
