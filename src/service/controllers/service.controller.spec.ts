import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { ServicesService } from '../services/service.service';

describe('ServiceController', () => {
  let controller: ServiceController;
  const mockService = { findAll: jest.fn(), create: jest.fn() } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [{ provide: ServicesService, useValue: mockService }],
    }).compile();

    controller = module.get<ServiceController>(ServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
