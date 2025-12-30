import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { User } from '../../user/entities/user.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

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

    const services = await this.serviceRepo.findBy({
      id: In(dto.serviceIds),
    });

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
      appointment: appointment,
    })) as any;

    return await this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return this.appointmentRepo.find({
      relations: ['user', 'items', 'items.service'],
    });
  }
}
