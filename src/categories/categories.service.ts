import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this.prisma.categories.create({
        data: createCategoryDto,
      });
      console.log(result);
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.categories.findMany({
        select: {
          name: true,
          product_id: true,
        },
      });
      return {
        data: categories,
      };
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryId = Number(id);

      const category = await this.prisma.categories.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error('Category not found');
      }

      const updatedCategory = await this.prisma.categories.update({
        where: { id: categoryId },
        data: updateCategoryDto,
      });

      return updatedCategory;
    } catch (error) {
      throw new error('Failed to update category: ' + error.message);
    }
  }
}
