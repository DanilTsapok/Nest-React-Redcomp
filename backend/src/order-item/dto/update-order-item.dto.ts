import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderItemDto {
  @ApiProperty({
    example: '1',
    description: 'quantity',
  })
  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;

  @ApiProperty({
    example: '805e6b07-f46b-4713-8613-0d944432afba',
    description: 'Order uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly orderId: string;
  @ApiProperty({
    example: '5d08a600-55d0-4487-b2f4-344c56054431',
    description: 'Product uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;
}
