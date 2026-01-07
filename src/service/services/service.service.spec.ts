import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Company } from '../../company/entities/company.entity';

describe('ServicesService', () => {
  let service: ServicesService;
  const repoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: getRepositoryToken(Service), useValue: repoMock },
        { provide: getRepositoryToken(Company), useValue: repoMock },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
