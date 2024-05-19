import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/auth/role.guard';
import Role from 'src/auth/role.enum';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  @Get('users')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @ApiProperty({ type: UpdateUserDto, description: 'User credentials' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @UseGuards(RoleGuard(Role.Admin))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
