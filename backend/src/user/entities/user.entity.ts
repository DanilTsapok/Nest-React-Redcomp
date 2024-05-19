import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Address } from 'src/address/entities/address.entity';

import Role from 'src/auth/role.enum';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Your name' })
  public id: string;

  @ApiProperty({ example: 'David', description: 'Your name' })
  @Column()
  public name: string;

  @ApiProperty({ example: 'David@gmail.com', description: 'Your valid email' })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({ example: 'password', description: 'Your password' })
  @Column()
  @Exclude()
  public password: string;

  @Column({ type: 'enum', array: true, enum: Role, default: [Role.User] })
  @Exclude()
  public roles: Role[];

  @Column({ default: false })
  public isBanned: boolean;

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  public reviews: Review[];

  @OneToMany(() => Address, (address) => address.user)
  public addresses: Address[];
}
