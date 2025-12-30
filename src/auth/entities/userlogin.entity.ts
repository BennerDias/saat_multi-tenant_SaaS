import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ApiProperty()
  public user: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @ApiProperty()
  public password: string;
}
