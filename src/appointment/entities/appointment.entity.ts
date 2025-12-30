import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AppointmentsService } from '../services/appointment.service';

@Entity({ name: 'tb_appointments' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  // ainda não criei o serviço de appointment.
  @OneToMany(() => AppointmentsService, (item) => item.appointment, {
    cascade: true,
  })
  items: AppointmentsService[];
}
