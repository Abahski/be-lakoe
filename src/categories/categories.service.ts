import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { categoriesValidation } from 'src/util/validation/categories/categoriesCreate';
import { CreateCategoryDto } from './dto/create-category.dto';
import { categoriesUpdateValidation } from 'src/util/validation/categories/categoriesUpdate';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { error, value } = categoriesValidation.validate(createCategoryDto);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const category = await this.prisma.categories.create({
        data: value,
      });

      return {
        data: category,
        message: 'Succesfully created category',
      };
    } catch (error) {
      throw new Error(`Failed to created categories: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.categories.findMany({
        where: {
          parent_id: null,
        },
        select: {
          id: true,
          name: true,
          product_id: true,
          children: {
            select: {
              id: true,
              name: true,
              product_id: true,
              children: {
                select: {
                  id: true,
                  name: true,
                  product_id: true,
                  children: {
                    select: {
                      id: true,
                      name: true,
                      product_id: true,
                    },
                  },
                },
              },
            },
          },
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
      const { error, value } =
        categoriesUpdateValidation.validate(updateCategoryDto);

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
        data: value,
      });

      return {
        data: updatedCategory,
        message: 'Successfully updated category',
      };
    } catch (error) {
      throw new Error('Failed to update category: ' + error.message);
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
