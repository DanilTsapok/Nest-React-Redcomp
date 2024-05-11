import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'David@gmail.com', description: 'Your valid email' })
  email: string;

  @ApiProperty({ example: 'David', description: 'Your name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ example: 'password', description: 'Your password' })
  password: string;
}

export default RegisterDto;
