import { ArrayMinSize, IsArray, IsDateString, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  userId: number;

  @IsDateString()
  start_date: Date;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  serviceIds: number[];
}
