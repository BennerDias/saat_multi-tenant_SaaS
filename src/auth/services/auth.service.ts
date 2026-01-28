import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/userlogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcrypt: Bcrypt,
    private JwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const findUser = await this.userService.findByEmail(email);

    if (!findUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const validaSenha = await this.bcrypt.compararSenhas(
      password,
      findUser.password,
    );

    if (findUser && validaSenha) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...resposta } = findUser;
      return resposta;
    }

    return null;
  }

  async login(userLogin: UserLogin) {
    const payload = { sub: userLogin.email };
    const findUser = await this.userService.findByEmail(userLogin.email);

    if (!findUser)
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return {
      ...findUser,
      token: `Bearer ${this.JwtService.sign(payload)}`,
    };
  }
}
