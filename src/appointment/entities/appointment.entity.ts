import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AppointmentService } from '../../appointment_services/entities/appointment_services.entity';
import { Company } from '../../company/entities/company.entity';

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

  @ManyToOne(() => Company)
  company: Company;

  @OneToMany(() => AppointmentService, (item) => item.appointment, {
    cascade: true,
  })
  items: AppointmentService[];
}
