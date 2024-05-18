import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'OrderItem ID' })
  public id: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  public product: Product;

  @ApiProperty({ example: 2, description: 'Quantity of the product ordered' })
  @Column()
  public quantity: number;
}
