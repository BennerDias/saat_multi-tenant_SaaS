/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { User } from '../../user/entities/user.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { DeleteResult } from 'typeorm/browser';
import { Company } from '../../company/entities/company.entity';
import { MembershipService } from '../../membership/service/membership.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,

    private readonly membershipService: MembershipService,
  ) {}

  async create(dto: CreateAppointmentDto, user: User) {
    const company = await this.companyRepo.findOneBy({ id: dto.companyId });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada!');
    }

    await this.membershipService.createClientIfNotExists(user, company);

    const services = await this.serviceRepo.find({
      where: { id: In(dto.serviceIds) },
    });

    if (services.length !== dto.serviceIds.length) {
      throw new HttpException(
        'Um ou mais serviços inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = this.appointmentRepo.create({
      user,
      company,
      start_date: dto.start_date,
      items: services.map((service) => ({
        service,
        price_at_appointment: service.price,
        duration_minutes: service.duration_minutes,
      })),
    });

    return this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return this.appointmentRepo.find({
      relations: ['user', 'items', 'items.service'],
    });
  }

  async findById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOne({
      where: {
        id,
      },

      relations: {
        user: true,
        items: true,
      },
    });

    if (!appointment)
      throw new HttpException(
        'Agendamento não encontrado',
        HttpStatus.NOT_FOUND,
      );

    return appointment;
  }

  async update(appointment: Appointment): Promise<Appointment> {
    await this.findById(appointment.id);
    return await this.appointmentRepo.save(appointment);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.appointmentRepo.delete(id);
  }
}
