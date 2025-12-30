import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcrypt: Bcrypt,
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
        id: id,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(user: User): Promise<User> {
    const findUser = await this.findByEmail(user.email);

    if (findUser)
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);

    user.password = await this.bcrypt.criptografarSenha(user.password);
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    await this.findById(user.id);

    const findUser = await this.findByEmail(user.email);

    if (findUser && findUser.id !== user.id)
      throw new HttpException('e-mail already exists!', HttpStatus.BAD_REQUEST);

    user.password = await this.bcrypt.criptografarSenha(user.password);

    return await this.userRepository.save(user);
  }
}
