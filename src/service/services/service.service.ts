import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/service.dto';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(dto: CreateServiceDto) {
    const company = await this.companyRepo.findOneBy({ id: dto.companyId });
    if (!company) throw new NotFoundException('Empresa não encontrada');
  }
}
