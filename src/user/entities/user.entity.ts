import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Membership } from '../../membership/entity/membership.entity';

@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name: string;

  @Column({
    length: 5000,
    default:
      'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg',
  })
  photo: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  password: string;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  phone?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  //Um usuário pra vários agendamentos
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  //Um usuário pra vários tipos de membro (o mesmo usuário pode ser dono da barbearia x, cliente da y, cliente da z)
  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
