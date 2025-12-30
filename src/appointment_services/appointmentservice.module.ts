import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './entities/appointment_services.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentService]),
    AppointmentServiceModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class AppointmentServiceModule {}
