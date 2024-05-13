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
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from 'src/user/dto/create-user.dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import RegisterDto from './dto/register.dto';
import LogInDto from './dto/login.dto';
import { LocalAuthenticationGuard } from './localAuth.guard';
import User from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(LocalAuthenticationGuard)
  @ApiBody({ type: User, description: 'Example registration data.' })
  async getCurrentAuthUser(@Req() request: RequestWithUser) {
    const { user } = request;
    console.log(user);
    const token = await this.authService.getToken(user.id);
    const currentUser =
      await this.authService.getUserFromAuthenticationToken(token);
    console.log(currentUser);
    return currentUser;
  }

  @Post('register')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Your account has been created successfully',
  })
  @ApiBody({ type: RegisterDto, description: 'Example registration data.' })
  async register(@Body() registrationData: CreateUserDto) {
    const user = await this.authService.registerUser(registrationData);
    user.roles = undefined;
    return user;
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiBody({ type: LogInDto, description: 'Example login data' })
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtAccessToken(user.id);
    response.setHeader('Set-cookie', cookie);
    const token = { access: this.authService.getToken(user.id) };
    return response.send(token);
  }

  @Post('log-out')
  @HttpCode(205)
  @ApiBearerAuth()
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
    return response.send('Logout');
  }
}
