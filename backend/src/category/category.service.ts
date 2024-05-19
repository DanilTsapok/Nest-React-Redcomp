import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    console.log(createCategoryDto);
    const createCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(createCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOneCategory(id: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findProductsFromCategory(idCategory: string) {
    const products = this.productRepository.find({
      where: { category: { id: idCategory } },
    });
    console.log(products);
    return products;
  }
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const currentCategory = await this.findOneCategory(id);
    Object.assign(currentCategory, updateCategoryDto);
    return this.categoryRepository.save(currentCategory);
  }

  async remove(id: string) {
    const Category = await this.findOneCategory(id);
    await this.categoryRepository.remove(Category);
  }
}
