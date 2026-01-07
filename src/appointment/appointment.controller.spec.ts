import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './controllers/appointment.controller';
import { AppointmentsService } from './services/appointment.service';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [{ provide: AppointmentsService, useValue: mockService }],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
