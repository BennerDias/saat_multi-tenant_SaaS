import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsInt()
  durationMinutes: number;

  @IsInt()
  companyId: number;
}
