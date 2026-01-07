import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { AppointmentsService } from './../services/appointment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Appointment } from '../entities/appointment.entity';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard)
@Controller('/Appointments')
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    return this.appointmentsService.findById(id);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() appointment: Appointment): Promise<Appointment> {
    return this.appointmentsService.update(appointment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.delete(id);
  }
}
