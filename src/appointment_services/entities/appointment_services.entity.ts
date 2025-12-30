import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { ManyToOne } from 'typeorm';

import { Appointment } from 'src/appointment/entities/appointment.entity';

import { Entity } from 'typeorm';
import { Service } from '../../service/entities/service.entity';

@Entity({ name: 'tb_appointment_services' })
export class AppointmentService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price_at_appointment: number;

  @Column({ type: 'int' })
  duration_minutes: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.items, {
    onDelete: 'CASCADE',
  })
  appointment: Appointment;

  @ManyToOne(() => Service, (service) => service.appointmentServices)
  service: Service;
}
