import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { AppointmentsService } from './../services/appointment.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  //   @Get()
  //   findAll() {
  //     return this.appointmentsService.findAll();
  //   }
}
