import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserService } from './services/users.service';
import { UserController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
