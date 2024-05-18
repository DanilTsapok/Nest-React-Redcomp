import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, (user) => user.orders)
  public user: User;

  @ApiProperty({ example: new Date(), description: 'Order Data' })
  @Column('timestamp')
  public date: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public orderItems: OrderItem[];
}
