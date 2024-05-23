import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'dc44e8ce-b574-4858-bcd6-041231b8b2a4',
    description: 'uuid User',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
  @ApiProperty({
    example: '2024-05-23T00:03:57.338Z',
    description: 'Date',
  })
  @IsNotEmpty()
  readonly date: Date;
}
