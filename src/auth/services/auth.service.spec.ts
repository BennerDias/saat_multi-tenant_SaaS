import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserLogin } from '../entities/userlogin.entity';

describe('AuthService', () => {
  let service: AuthService;
  const repoMock = { findOne: jest.fn(), save: jest.fn() };

  beforeEach(async () => {
    const mockUserService = { findByEmail: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(UserLogin), useValue: repoMock },
        { provide: UserService, useValue: mockUserService },
        { provide: Bcrypt, useValue: { compararSenhas: jest.fn(), criptografarSenha: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
