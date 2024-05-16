import { Injectable } from '@nestjs/common';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DecorationService {
  constructor(private prisma: PrismaService) {}
  async create(createDecorationDto: CreateDecorationDto) {
    try {
      const decoration = await this.prisma.decoration.create({
        data: createDecorationDto,
      });

      return {
        data: decoration,
        message: 'Succesfully create decoration',
      };
    } catch (error) {
      throw new Error(`Failed to create decoration: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const decoration = await this.prisma.decoration.findMany();
      return {
        message: 'successfully get all decoration',
        data: decoration,
      };
    } catch (error) {
      throw new Error(`Failed to fetch decoration: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const decoration = await this.prisma.decoration.findMany({
        where: { id: id },
      });
      return {
        message: 'Succesfully get all decoration',
        data: decoration,
      };
    } catch (error) {
      throw new Error(`Failed to fetch decoration: ${error.message}`);
    }
  }

  async update(id: number, updateDecorationDto: UpdateDecorationDto) {
    try {
      const decoratorId = Number(id);
      const existingUser = await this.prisma.user.findUnique({
        where: { id: decoratorId },
      });

      if (!existingUser) {
        throw new Error(`User with ID ${decoratorId} not found.`);
      }

      const decoration = await this.prisma.decoration.update({
        where: { id: decoratorId },
        data: updateDecorationDto,
      });

      return {
        data: decoration,
        message: 'Succesfully update decoration',
      };
    } catch (error) {
      throw new Error(`Failed to update decoration: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const decoration = await this.prisma.decoration.delete({
        where: { id: id },
      });

      return {
        data: decoration,
        message: 'Succesfully delete decoration',
      };
    } catch (error) {
      throw new Error(`Failed to delete decoration: ${error.message}`);
    }
  }
}
