import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Category ID' })
  public id: string;

  @ApiProperty({ example: 'Headsets', description: 'Category name' })
  @Column()
  public name: string;

  @OneToMany(() => Product, (product) => product.category)
  public products: Product[];
}
