import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import User from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Review ID' })
  public id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  public user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  public product: Product;

  @ApiProperty({ example: 'Great product!', description: 'Review content' })
  @Column()
  public content: string;

  @ApiProperty({ example: 5, description: 'Review rating' })
  @Column('int')
  public rating: number;
}
