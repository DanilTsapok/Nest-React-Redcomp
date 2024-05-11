import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './jwt-auth.guard';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import User from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Your account has been created successfully',
  })
  @ApiBody({ type: User, description: 'Registration data example' })
  async register(@Body() registrationData: CreateUserDto) {
    const user = await this.authService.registerUser(registrationData);
    return user;
  }

  @HttpCode(200)
  @Post('login')
  @ApiBody({ type: User, description: 'Login Form data example' })
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtAccessToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    response.send(user);
    return user;
  }

  @Post('log-out')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }
}
