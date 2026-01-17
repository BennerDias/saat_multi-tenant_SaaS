import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { User } from '../user/entities/user.entity';
import { Membership } from '../membership/entity/membership.entity';
import { MembershipModule } from '../membership/membership.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User, Membership]),
    MembershipModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [TypeOrmModule, CompanyService],
})
export class CompanyModule {}
