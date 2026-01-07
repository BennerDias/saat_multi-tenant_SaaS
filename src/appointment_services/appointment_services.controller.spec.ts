import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentServicesController } from './controllers/appointment_services.controller';
import { Appointment_serviceService } from './services/appointment_services.service';

describe('AppointmentServicesController', () => {
  let controller: AppointmentServicesController;
  const mockService = { findAll: jest.fn(), create: jest.fn() } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentServicesController],
      providers: [
        { provide: Appointment_serviceService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<AppointmentServicesController>(
      AppointmentServicesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
