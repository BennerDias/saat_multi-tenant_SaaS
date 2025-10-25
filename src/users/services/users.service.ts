import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(user: User): Promise<User> {
    const findUser = await this.findByEmail(user.email);

    if (findUser)
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);

    // user.password_hash = await this.bcrypt.hashPassword(user.password_hash);
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    await this.findById(user.id);

    const findUser = await this.findByEmail(user.email);

    if (findUser && findUser.id !== user.id)
      throw new HttpException('e-mail already exists!', HttpStatus.BAD_REQUEST);

    // user.password_hash = await this.bcrypt.passwordPassword(user.password_hash);
    return await this.userRepository.save(user);
  }
}
