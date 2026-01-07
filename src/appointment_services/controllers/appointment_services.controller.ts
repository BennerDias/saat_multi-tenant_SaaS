import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { AppointmentService } from '../entities/appointment_services.entity';
import { AppointmentServicesService } from '../services/appointment_services.service';

@ApiTags('Appointment Services (internal)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/appointment-services')
export class AppointmentServicesController {
  constructor(
    private readonly appointmentService: AppointmentServicesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<AppointmentService[]> {
    return this.appointmentService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<AppointmentService> {
    return this.appointmentService.findById(id);
  }
}
