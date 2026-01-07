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

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const serviceIds = Array.isArray(dto.serviceIds)
      ? dto.serviceIds
      : [dto.serviceIds];
    const services = await this.serviceRepo.findBy({ id: In(serviceIds) });

    if (services.length !== dto.serviceIds.length) {
      throw new NotFoundException('Um ou mais serviços não foram encontrados');
    }

    const appointment = new Appointment();
    appointment.start_date = new Date(dto.start_date);
    appointment.user = user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    appointment.items = services.map((service) => ({
      service: service,
      price_at_appointment: service.price,
      duration_minutes: service.duration_minutes,
      appointment: appointment,
    })) as any;

    const saved = await this.appointmentRepo.save(appointment);

    // Remove back-reference to avoid circular structure when serializing to JSON
    const sanitized = {
      ...saved,
      items:
        saved.items?.map(({ appointment: _a, ...rest }) => rest as any) ?? [],
    } as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return sanitized;
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
