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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}
@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  password_hash: string;

  @IsEnum(UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @IsOptional()
  @Column({ length: 20, nullable: true })
  phone?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
