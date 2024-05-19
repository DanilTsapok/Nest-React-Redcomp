import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    const newProduct = this.productsRepository.create({
      ...productData,
      category: category,
    });
    return this.productsRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = this.productsRepository.find({ relations: ['category'] });
    if (!products) {
      throw new NotFoundException(`Products are not found`);
    }
    return products;
  }

  async findOneProduct(id: string): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const selectProduct = await this.findOneProduct(id);
    Object.assign(selectProduct, updateProductDto);
    return this.productsRepository.save(selectProduct);
  }

  async remove(id: string) {
    const product = await this.findOneProduct(id);
    await this.productsRepository.remove(product);
  }
}
