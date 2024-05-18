import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import User from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';
import { Address } from 'src/address/entities/address.entity';
config();
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [User, Product, Category, Order, OrderItem, Review, Address],
  synchronize: true,
});
