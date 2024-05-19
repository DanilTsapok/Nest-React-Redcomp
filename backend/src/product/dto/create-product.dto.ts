import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'High-performance laptop',
    description: 'The description of the product',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500, description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The category ID of the product',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
