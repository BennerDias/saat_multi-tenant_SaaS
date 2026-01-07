import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentService } from '../entities/appointment_services.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class Appointment_serviceService {
  constructor(
    @InjectRepository(AppointmentService)
    private appointmentServiceRepository: Repository<AppointmentService>,
  ) {}

  async findAll(): Promise<AppointmentService[]> {
    return await this.appointmentServiceRepository.find({
      relations: {
        appointment: true,
        service: true,
      },
    });
  }

  async findById(id: number): Promise<AppointmentService> {
    const appointmentService = await this.appointmentServiceRepository.findOne({
      where: {
        id,
      },

      relations: {
        appointment: true,
        service: true,
      },
    });

    if (!appointmentService)
      throw new HttpException(
        'Appointment service not found',
        HttpStatus.NOT_FOUND,
      );

    return appointmentService;
  }

  async create(
    appointmentService: AppointmentService,
  ): Promise<AppointmentService> {
    return await this.appointmentServiceRepository.save(appointmentService);
  }

  async update(
    appointmentService: AppointmentService,
  ): Promise<AppointmentService> {
    await this.findById(appointmentService.id);
    return await this.appointmentServiceRepository.save(appointmentService);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.appointmentServiceRepository.delete(id);
  }

  //   async totalTime(): Promise<number> {
  //     const services =
  //   }
}
