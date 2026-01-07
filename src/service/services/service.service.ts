import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from '../dto/service.dto';
import { DeleteResult } from 'typeorm/browser';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find({
      relations: {
        company: true,
      },
    });
  }

  async findById(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: {
        id,
      },

      relations: {
        company: true,
      },
    });

    if (!service)
      throw new HttpException('Service doesnt found!', HttpStatus.NOT_FOUND);

    return service;
  }

  async create(dto: CreateServiceDto) {
    const company = await this.companyRepository.findOne({
      where: { id: dto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const service = this.serviceRepository.create({
      name: dto.name,
      price: dto.price,
      duration_minutes: dto.durationMinutes,
      company: company,
    });

    return this.serviceRepository.save(service);
  }

  async update(dto: CreateServiceDto): Promise<Service> {
    return await this.serviceRepository.save(dto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.serviceRepository.delete(id);
  }
}
