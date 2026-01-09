import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserLogin } from '../entities/userlogin.entity';
import { AuthService } from '../services/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@ApiTags('User')
@Controller('/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() email: UserLogin): Promise<any> {
    return this.authService.login(email);
  }
}
