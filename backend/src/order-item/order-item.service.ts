import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return orderItem;
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    await this.orderItemRepository.update(id, updateOrderItemDto);
    const updatedOrderItem = await this.orderItemRepository.findOneBy({ id });
    if (!updatedOrderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return updatedOrderItem;
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.orderItemRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
  }
}
