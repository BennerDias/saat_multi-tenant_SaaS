import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './entities/appointment_services.entity';
import { Appointment_serviceService } from './services/appointment_services.service';
import { AppointmentServicesController } from './controllers/appointment_services.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentService]),
    AppointmentServiceModule,
  ],
  providers: [Appointment_serviceService],
  controllers: [AppointmentServicesController],
  exports: [Appointment_serviceService],
})
export class AppointmentServiceModule {}
