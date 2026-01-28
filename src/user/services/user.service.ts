/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcrypt: Bcrypt,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['memberships', 'memberships.company'],
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const findUser = await this.findByEmail(dto.email);

    if (findUser)
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);

    const user = this.userRepository.create({
      ...dto,
      password: await this.bcrypt.criptografarSenha(dto.password),
    });

    return UserMapper.toResponse(await this.userRepository.save(user));
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.findById(id);

    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing && existing.id !== user.id) {
        throw new HttpException(
          'E-mail already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (dto.password) {
      dto.password = await this.bcrypt.criptografarSenha(dto.password);
    }

    Object.assign(user, dto);

    const updated = await this.userRepository.save(user);

    return UserMapper.toResponse(updated);
  }
}
