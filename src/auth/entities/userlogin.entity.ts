import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ApiProperty()
  public email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ApiProperty()
  public password: string;
}
