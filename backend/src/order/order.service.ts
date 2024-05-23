import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, ...orderData } = createOrderDto;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const newOrder = this.orderRepository.create({
      ...orderData,
      user: user,
    });
    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    const orders = this.orderRepository.find({ relations: ['user'] });
    return orders;
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    const updatedOrder = await this.orderRepository.findOneBy({ id });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.orderRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
