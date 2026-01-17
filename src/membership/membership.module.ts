import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipService } from './service/membership.service';
import { MembershipController } from './controller/membership.controller';
import { Membership } from './entity/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  providers: [MembershipService],
  controllers: [MembershipController],
  exports: [TypeOrmModule, MembershipService],
})
export class MembershipModule {}
