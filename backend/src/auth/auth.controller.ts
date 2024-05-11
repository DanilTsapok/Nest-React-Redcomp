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
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import RegisterDto from './dto/register.dto';
import LogInDto from './dto/login.dto';
import { LocalAuthenticationGuard } from './localAuth.guard';

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
  @ApiBody({ type: RegisterDto, description: 'Registration data example' })
  async register(@Body() registrationData: CreateUserDto) {
    const user = await this.authService.registerUser(registrationData);
    return user;
  }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  @ApiBody({ type: LogInDto, description: 'Login form data example' })
  async login(@Req() request: RequestWithUser) {
    console.log(request.user);
  }

  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }
}
