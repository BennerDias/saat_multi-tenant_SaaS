import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from '../entity/membership.entity';
import { Repository } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
  ) {}

  async findByUserAndCompany(userId: number, companyId: number) {
    return this.membershipRepo.findOne({
      where: {
        user: { id: userId },
        company: { id: companyId },
      },
    });
  }

  async createOwner(
    user: User | { id: number },
    company: Company,
  ): Promise<Membership> {
    const ownerMembership = this.membershipRepo.create({
      role: 'OWNER',
      company: company,
      user: user,
    });

    return await this.membershipRepo.save(ownerMembership);
  }

  async createClientIfNotExists(user: User, company: Company) {
    const exists = await this.findByUserAndCompany(user.id, company.id);
    if (!exists) {
      return this.membershipRepo.save({
        user,
        company,
        role: 'CLIENT',
      });
    }
    return exists;
  }
}
