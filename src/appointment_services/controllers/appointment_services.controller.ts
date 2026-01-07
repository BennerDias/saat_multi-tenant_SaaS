import { AppointmentService } from './../entities/appointment_services.entity';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Appointment_serviceService } from '../services/appointment_services.service';

@ApiTags('AppointmentServices')
@UseGuards(JwtAuthGuard)
@Controller('/AppointmentServices')
@ApiBearerAuth()
export class AppointmentServicesController {
  constructor(
    private readonly Appointment_serviceService: Appointment_serviceService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<AppointmentService[]> {
    return this.Appointment_serviceService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<AppointmentService> {
    return this.Appointment_serviceService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() appointmentService: AppointmentService,
  ): Promise<AppointmentService> {
    return this.Appointment_serviceService.create(appointmentService);
  }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  update(
    @Body() appointmentService: AppointmentService,
  ): Promise<AppointmentService> {
    return this.Appointment_serviceService.create(appointmentService);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.Appointment_serviceService.delete(id);
  }
}
