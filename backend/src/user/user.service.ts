import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRespository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email doesn`t exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.userRespository.create(userData);
    await this.userRespository.save(newUser);
    return newUser;
  }

  async getById(userId: number) {
    const user = await this.userRespository.findOne({ where: { id: userId } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
