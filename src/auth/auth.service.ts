/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private PrismaService: PrismaService,
  ) {}

  async validateUser({ username, password }: CreateUserDto) {
    const userFirst = await this.PrismaService.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!userFirst) {
      throw new UnauthorizedException('Username or password is not valid');
    }

    const isPasswordValid = await bcrypt.compare(password, userFirst.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is not valid');
    }

    const { password: userPassword, ...userWithoutPassword } = userFirst;
    const token = this.jwtService.sign(userWithoutPassword);

    return token;
  }
}
