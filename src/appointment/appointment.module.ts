import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Service } from '../service/entities/service.entity';
import { User } from '../user/entities/user.entity';
import { AppointmentsService } from './services/appointment.service';
import { AppointmentsController } from './controllers/appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Service, User])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentModule {}
