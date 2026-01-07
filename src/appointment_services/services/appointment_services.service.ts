import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentService } from '../entities/appointment_services.entity';

@Injectable()
export class AppointmentServicesService {
  constructor(
    @InjectRepository(AppointmentService)
    private readonly appointmentServiceRepo: Repository<AppointmentService>,
  ) {}

  async findAll(): Promise<AppointmentService[]> {
    return this.appointmentServiceRepo.find({
      relations: {
        appointment: true,
        service: true,
      },
    });
  }

  async findById(id: number): Promise<AppointmentService> {
    const item = await this.appointmentServiceRepo.findOne({
      where: { id },
      relations: {
        appointment: true,
        service: true,
      },
    });

    if (!item) {
      throw new HttpException(
        'Appointment service not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return item;
  }
}
