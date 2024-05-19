import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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

  async getById(userId: string) {
    const user = await this.userRespository.findOne({ where: { id: userId } });
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findAll() {
    const users = await this.userRespository.find();
    if (users) {
      return users;
    }
    throw new HttpException('Users is empty', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const selectUser = await this.getById(id);
    Object.assign(selectUser, updateUserDto);
    return this.userRespository.save(selectUser);
  }

  async remove(id: string) {
    const userDelete = await this.getById(id);
    await this.userRespository.remove(userDelete);
  }
}
