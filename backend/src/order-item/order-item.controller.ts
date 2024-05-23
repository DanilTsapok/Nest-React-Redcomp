import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@ApiTags('OrderItems')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({
    status: 201,
    description: 'The order item has been successfully created.',
    type: OrderItem,
  })
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({
    status: 200,
    description: 'Return all order items',
    type: [OrderItem],
  })
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order item to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Return the order item with the given ID',
    type: OrderItem,
  })
  async findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order item to update' })
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully updated.',
    type: OrderItem,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order item to delete' })
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderItemService.remove(id);
  }
}
