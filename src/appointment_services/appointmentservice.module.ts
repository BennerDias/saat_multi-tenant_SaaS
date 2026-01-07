import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './entities/appointment_services.entity';
import { AppointmentServicesController } from './controllers/appointment_services.controller';
import { AppointmentServicesService } from './services/appointment_services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentService]),
    AppointmentServiceModule,
  ],
  providers: [AppointmentServicesService],
  controllers: [AppointmentServicesController],
  exports: [AppointmentServicesService],
})
export class AppointmentServiceModule {}
