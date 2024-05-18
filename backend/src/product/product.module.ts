import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, OrderItem, Review])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
