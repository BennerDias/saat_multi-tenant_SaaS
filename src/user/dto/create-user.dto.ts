import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin123' })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '11999999999', required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'https://img.com/photo.png', required: false })
  @IsOptional()
  photo?: string;
}
