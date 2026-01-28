import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsInt } from 'class-validator';
export class CreateAppointmentDto {
  @ApiProperty()
  @IsInt()
  companyId: number;

  @ApiProperty()
  @IsDateString()
  start_date: Date;

  // Colocar numero de telefone do cliente.

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  serviceIds: number[];
}
