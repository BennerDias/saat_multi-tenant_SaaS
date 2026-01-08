import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyResponseDto } from '../dto/company-response.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findById(id: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
    });
    if (!company)
      throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);

    return company;
  }

  async findAllByName(name: string): Promise<Company[]> {
    return await this.companyRepository.find({
      where: {
        name: ILike(`%${name}`),
      },
    });
  }

  async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    return await this.companyRepository.save(dto);
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
    const company = await this.findById(id);

    const updated = this.companyRepository.merge(company, dto);

    return await this.companyRepository.save(updated);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.companyRepository.delete(id);
  }
}
