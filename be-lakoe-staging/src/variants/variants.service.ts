import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}
  async createVariant(createVariantDto: CreateVariantDto) {
    try {
      const variant = await this.prisma.variants.create({
        data: createVariantDto,
      });

      return {
        data: variant,
        message: 'Successfully created variant',
      };
    } catch (error) {
      throw new Error(`Failed to create variant: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const variants = await this.prisma.variants.findMany({
        select: {
          name: true,
          is_active: true,
          product: {
            select: {
              name: true,
              description: true,
              attachments: true,
              is_active: true,
              minimum_order: true,
            },
          },
        },
      });

      return {
        data: variants,
      };
    } catch (error) {
      throw new Error(`Failed to fetch variants: ${error.message}`);
    }
  }

  async findActive() {
    try {
      const variants = await this.prisma.variants.findMany({
        where: {
          is_active: true,
        },
        select: {
          name: true,
          is_active: true,
          product: {
            select: {
              name: true,
              description: true,
              attachments: true,
              is_active: true,
              minimum_order: true,
            },
          },
        },
      });

      return {
        data: variants,
      };
    } catch (error) {
      throw new Error(`Failed to fetch variants: ${error.message}`);
    }
  }

  async findInActive() {
    try {
      const variants = await this.prisma.variants.findMany({
        where: {
          is_active: false,
        },
        select: {
          name: true,
          is_active: true,
          product: {
            select: {
              name: true,
              description: true,
              attachments: true,
              is_active: true,
              minimum_order: true,
            },
          },
        },
      });

      return {
        data: variants,
      };
    } catch (error) {
      throw new Error(`Failed to fetch variants: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const variant = await this.prisma.variants.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          is_active: true,
          product: {
            select: {
              name: true,
              description: true,
              attachments: true,
              is_active: true,
              minimum_order: true,
            },
          },
        },
      });

      if (!variant) return { message: 'Variant not found' };
      return {
        data: variant,
      };
    } catch (error) {
      throw new Error(`Failed to find variant: ${error.message}`);
    }
  }

  async update(id: number, updateVariantDto: UpdateVariantDto) {
    try {
      const variantId = Number(id);

      const variant = await this.prisma.variants.findUnique({
        where: { id: variantId },
      });

      if (!variant) return { message: 'Variant not found' };

      const updateVariant = await this.prisma.variants.update({
        where: { id: variantId },
        data: updateVariantDto,
      });

      return {
        data: updateVariant,
        message: 'Successfully updated variant',
      };
    } catch (error) {
      throw new Error(`Failed to update variant: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const variantId = Number(id);
      const variant = await this.prisma.variants.findUnique({
        where: { id: variantId },
      });

      if (!variant) return { message: 'Variant not found' };
      const deleteVariant = await this.prisma.variants.delete({
        where: { id: variantId },
      });

      return {
        data: deleteVariant,
        message: 'Successfully deleted variant',
      };
    } catch (error) {
      throw new Error(`Failed to delete variant: ${error.message}`);
    }
  }
}
