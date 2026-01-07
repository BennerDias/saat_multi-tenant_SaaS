import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Service } from '../../service/entities/service.entity';
import { User } from '../../user/entities/user.entity';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const repoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: getRepositoryToken(Appointment), useValue: repoMock },
        { provide: getRepositoryToken(Service), useValue: repoMock },
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
