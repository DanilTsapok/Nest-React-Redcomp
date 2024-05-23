import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { orderId, productId, ...orderItemData } = createOrderItemDto;
    const order = await this.orderRepository.findOneBy({ id: orderId });
    const product = await this.productRepository.findOneBy({ id: productId });
    const newOrderItem = this.orderItemRepository.create({
      ...orderItemData,
      order: order,
      product: product,
    });
    return this.orderItemRepository.save(newOrderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ relations: ['product', 'order'] });
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
