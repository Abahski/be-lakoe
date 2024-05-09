import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.usersService.createUser(createUserDto);
      return {
        data: result,
        message: 'create user success',
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();
      return {
        data: result.data,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const userId = Number(id);
      const result = await this.usersService.findOne(userId);
      return {
        hello: result,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userId = Number(id);
      const result = await this.usersService.update(userId, updateUserDto);
      return {
        data: result,
        message: 'update user success',
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const userId = Number(id);
      await this.usersService.delete(userId);
      return {
        message: 'delete success',
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
