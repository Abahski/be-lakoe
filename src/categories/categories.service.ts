import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { categoriesValidation } from 'src/util/validation/categories';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto) {
    try {
      const { error } = categoriesValidation.validate(data);

      if (error) {
        throw new Error(error.details[0].message);
      }

      return this.prisma.categories.create({ data });
    } catch (error) {
      throw new Error(`Failed to created categories: ${error.message}`);
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

  async findOne(id: number) {
    try {
      const category = await this.prisma.categories.findUnique({
        where: { id },
        select: {
          name: true,
          product_id: true,
        },
      });

      if (!category) return { message: 'Category not found' };
    } catch (error) {
      throw new Error(`Failed to find category: ${error.message}`);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const { error } = categoriesValidation.validate(updateCategoryDto);

      if (error) {
        throw new Error(error.details[0].message);
      }
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

      return {
        data: updatedCategory,
        message: 'Succesfully update category',
      };
    } catch (error) {
      throw new error('Failed to update category: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const categoryId = Number(id);
      const category = await this.prisma.categories.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return { message: 'Category not found' };
      }
      const deleteCategory = await this.prisma.categories.delete({
        where: { id: categoryId },
      });

      return {
        data: deleteCategory,
        message: 'Successfully delete category',
      };
    } catch (error) {
      throw new Error(`Failed to delete category: ${error}`);
    }
  }
}
