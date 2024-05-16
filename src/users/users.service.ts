import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { userValidation } from 'src/util/validation/users/usersCreate';
import * as bcrypt from 'bcrypt';
import { userUpdateValidation } from 'src/util/validation/users/usersUpdate';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const { error } = userValidation.validate(data);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const isExists = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              username: data.username,
            },
            {
              email: data.username,
            },
          ],
        },
      });

      if (isExists) {
        throw new Error('Username or email already exist');
      }
      const hashBcrypt = await bcrypt.hash(data.password, 2);
      data.password = hashBcrypt;
      if (error) {
        throw new Error(error.details[0].message);
      }

      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return {
        data: users,
      };
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      const { error } = userUpdateValidation.validate(data);
      const userId = Number(id);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      if (data.password) {
        const plainPassword =
          typeof data.password === 'string' ? data.password : data.password.set;
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        data.password = hashedPassword;
      }

      if (data.username && data.username !== existingUser.username) {
        const existingUsernameUser = await this.prisma.user.findUnique({
          where: { username: data.username as string },
        });
        if (existingUsernameUser) {
          throw new Error(`Username ${data.username} is already taken.`);
        }
      }

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: data,
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }
}
