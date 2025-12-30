import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentService } from '../appointment_services/entities/appointment_services.entity';
import { AppointmentsController } from './controllers/appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), AppointmentModule],
  providers: [AppointmentService],
  controllers: [AppointmentsController],
  exports: [AppointmentService],
})
export class AppointmentModule {}
