import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Product ID' })
  public id: string;

  @ApiProperty({ example: 'Laptop', description: 'Product name' })
  @Column()
  public name: string;

  @ApiProperty({
    example: 'A high-end laptop',
    description: 'Product description',
  })
  public description: string;
  @ApiProperty({ example: 20000, description: 'Product price' })
  @Column('decimal')
  public price: number;

  @ManyToOne(() => Category, (category) => category.products)
  public category: Category[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  public orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  public reviews: Review[];
}
