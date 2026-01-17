import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from '../entity/membership.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private repo: Repository<Membership>,
  ) {}

  findByUserAndCompany(userId: number, companyId: number) {
    return this.repo.findOne({
      where: {
        user: { id: userId },
        company: { id: companyId },
      },
    });
  }

  async createOwner(user: User, company: Company) {
    return this.repo.save({
      user,
      company,
      role: 'OWNER',
    });
  }

  async createClientIfNotExists(user: User, company: Company) {
    const exists = await this.findByUserAndCompany(user.id, company.id);
    if (!exists) {
      return this.repo.save({
        user,
        company,
        role: 'CLIENT',
      });
    }
    return exists;
  }
}
