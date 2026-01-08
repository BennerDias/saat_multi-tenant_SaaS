import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AppointmentService } from '../../appointment_services/entities/appointment_services.entity';
import { Company } from '../../company/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_services' })
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty()
  @Column()
  duration_minutes: number;

  @ApiProperty()
  @ManyToOne(() => Company, (company) => company.services)
  company: Company;

  @ApiProperty()
  @OneToMany(
    () => AppointmentService,
    (appointmentService) => appointmentService.service,
  )
  appointmentServices: AppointmentService[];
}
