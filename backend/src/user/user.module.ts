import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Address } from 'src/address/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Review, Address])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
