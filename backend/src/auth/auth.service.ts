import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import CreateUserDto from 'src/user/dto/create-user.dto';
import TokenPayload from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import User from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async registerUser(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
      });

      createUser.password = undefined;
      createUser.id = undefined;
      return createUser;
    } catch (error) {
      throw error?.code === PostgresErrorCode.UniqueViolation
        ? new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
        : new HttpException(
            'Failed to register user',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  public getCookieWithJwtAccessToken(user: User) {
    const token = this.getToken(user);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`;
  }

  public async getUserFromAuthenticationToken(token: string): Promise<User> {
    const decodedToken = this.jwtService.verify(token);
    const userId = (decodedToken as TokenPayload).userId;
    return await this.usersService.getById(userId);
  }

  public getToken(user: User) {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.name,
      roles: user.roles,
      isBanned: user.isBanned,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
    return token;
  }

  public async verifyPassword(plainTextPassword: string, hashedPassword) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookiesForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
