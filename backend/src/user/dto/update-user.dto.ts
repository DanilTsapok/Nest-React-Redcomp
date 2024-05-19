import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import Role from 'src/auth/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'David', description: 'Your name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'David@gmail.com',
    description: 'Your valid email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'newpassword',
    description: 'Your new password',
    required: false,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: [Role.User],
    description: 'Roles assigned to the user',
    required: false,
  })
  @IsArray()
  @IsOptional()
  roles?: Role[];

  @ApiProperty({
    example: false,
    description: 'Whether the user is banned',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isBanned?: boolean;
}
