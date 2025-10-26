import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

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

  async create(company: Company): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async update(company: Company): Promise<Company> {
    await this.findById(company.id);

    return await this.companyRepository.save(company);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.companyRepository.delete(id);
  }
}
