import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { userValidation } from 'src/util/validation/user';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private PrismaService: PrismaService
    ) { }

    async validateUser({ username, password }: CreateUserDto) {
        const userFirst = await this.PrismaService.user.findFirst({
            where: {
                username: username
            },
        });

        const isMatch = await bcrypt.compare(password, userFirst.password)
        if (!isMatch) {
            return {
                error: "Username or password is not valid"
            }
        }

        const { password: userPassword, ...userWithoutPassword } = userFirst;
        const token = this.jwtService.sign(userWithoutPassword);

        return token;
    }
}
