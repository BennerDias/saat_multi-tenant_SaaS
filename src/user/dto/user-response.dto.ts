import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  photo?: string;

  @ApiProperty({ type: [Number], nullable: true })
  companyIds?: number[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
