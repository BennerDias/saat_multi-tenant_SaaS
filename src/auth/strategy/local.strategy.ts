import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super();
    this._usernameField = 'user';
    this._passwordField = 'password';
  }

  async validate(user: string, password: string): Promise<any> {
    const validaUsuario = await this.authService.validateUser(user, password);
    if (!validaUsuario)
      throw new UnauthorizedException('Usuário ou senha inválidos');

    return validaUsuario;
  }
}
