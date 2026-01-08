import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  durationMinutes: number;

  @ApiProperty()
  @IsInt()
  companyId: number;
}
