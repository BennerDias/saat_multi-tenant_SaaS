import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_companies' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ length: 20, nullable: true })
  cnpj: string;

  @Column({ length: 4000, nullable: true })
  address: string;

  @Column({ length: 5000, nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 20, nullable: false })
  @IsNotEmpty()
  phone: string;

  @Column({ length: 5000, nullable: true })
  image_url: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
