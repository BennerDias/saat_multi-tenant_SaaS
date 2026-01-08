import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_companies' })
export class Company {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255, nullable: false })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  cnpj: string;

  @ApiProperty()
  @Column({ length: 4000, nullable: true })
  address: string;

  @ApiProperty()
  @Column({ length: 5000, nullable: true })
  description: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  email: string;

  @ApiProperty()
  @Column({ length: 20, nullable: false })
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @Column({ length: 5000, nullable: true })
  image_url: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ApiProperty()
  @OneToMany(() => Service, (service) => service.company)
  services: Service[];

  @ApiProperty()
  @OneToMany(() => User, (user) => user.company)
  user: User;
}
