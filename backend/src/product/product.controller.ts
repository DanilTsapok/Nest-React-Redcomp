import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import Role from 'src/auth/role.enum';
import RoleGuard from 'src/auth/role.guard';
import { Product } from './entities/product.entity';

@ApiTags('product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({ type: CreateProductDto, description: 'Create Product' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
