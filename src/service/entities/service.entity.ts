import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AppointmentService } from '../../appointment_services/entities/appointment_services.entity';
import { Company } from '../../company/entities/company.entity';

@Entity({ name: 'tb_services' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column()
  duration_minutes: number;

  @ManyToOne(() => Company, (company) => company.services)
  company: Company;

  @OneToMany(
    () => AppointmentService,
    (appointmentService) => appointmentService.service,
  )
  appointmentServices: AppointmentService[];
}
