import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('tb_memberships')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.memberships)
  user: User;

  @ManyToOne(() => Company, (company) => company.memberships)
  company: Company;

  @Column({
    type: 'enum',
    enum: ['OWNER', 'ADMIN', 'STAFF', 'CLIENT'],
    default: 'CLIENT',
  })
  role: 'OWNER' | 'ADMIN' | 'STAFF' | 'CLIENT';

  @CreateDateColumn()
  created_at: Date;
}
