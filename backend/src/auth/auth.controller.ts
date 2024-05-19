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
  HttpException,
  HttpStatus,
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
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @ApiBearerAuth()
  // @UseGuards(LocalAuthenticationGuard)
  // @ApiBody({ type: User, description: 'Example registration data.' })
  async getCurrentAuthUser(@Param('id') userId: string) {
    return await this.userService.getById(userId);
    // return await this.authService.getUserFromAuthenticationToken(token);
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
    // console.log(user);
    const token = { access: this.authService.getToken(user) };
    const cookie = this.authService.getCookieWithJwtAccessToken(user);
    response.setHeader('Set-cookie', cookie);
    const loginUser = { ...user, token };
    return response.send(loginUser);
  }

  @Post('log-out')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseGuards(LocalAuthenticationGuard)
  @ApiBearerAuth()
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
    throw new HttpException('User log-out', HttpStatus.NOT_FOUND);
  }
}
