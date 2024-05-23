import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders', type: [Order] })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order to retrieve' })
  @ApiBody({ type: Order, description: 'Find' })
  @ApiResponse({
    status: 200,
    description: 'Return the order with the given ID',
    type: Order,
  })
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order to update' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order to delete' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
