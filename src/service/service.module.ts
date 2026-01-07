import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CompanyModule } from '../company/company.module';
import { ServicesService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), CompanyModule],
  providers: [ServicesService],
  controllers: [ServiceController],
  exports: [],
})
export class ServiceModule {}
