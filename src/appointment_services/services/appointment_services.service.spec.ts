import { Test, TestingModule } from '@nestjs/testing';
import { Appointment_serviceService } from './appointment_services.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppointmentService } from '../entities/appointment_services.entity';

describe('Appointment_serviceService', () => {
  let service: Appointment_serviceService;
  const repoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Appointment_serviceService,
        { provide: getRepositoryToken(AppointmentService), useValue: repoMock },
      ],
    }).compile();

    service = module.get<Appointment_serviceService>(
      Appointment_serviceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
