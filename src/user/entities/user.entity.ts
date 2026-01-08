import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Company } from '../../company/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}
@Entity({ name: 'tb_users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 5000 })
  photo: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  password: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @ApiProperty()
  @IsOptional()
  @Column({ length: 20, nullable: true })
  phone?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ApiProperty()
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @ApiProperty()
  @OneToOne(() => Company, (company) => company.user)
  company: Company;
}
