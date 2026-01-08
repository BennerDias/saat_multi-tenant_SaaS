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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_appointments' })
export class Appointment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  start_date: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ApiProperty()
  @OneToMany(() => AppointmentService, (item) => item.appointment, {
    cascade: true,
  })
  items: AppointmentService[];
}
