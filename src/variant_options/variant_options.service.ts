import { Body, Injectable } from '@nestjs/common';
import { CreateVariantOptionDto } from './dto/create-variant_option.dto';
import { UpdateVariantOptionDto } from './dto/update-variant_option.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantOptionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createVariantOptionDto: CreateVariantOptionDto) {
    try {
      const { variant_id } = createVariantOptionDto;

      const variantId = await this.prisma.variantOptions.findUnique({
        where: { id: variant_id },
      });

      if (!variantId) {
        return {
          message: 'Variant  not found',
        };
      }
      const variantOptions = await this.prisma.variantOptions.create({
        data: createVariantOptionDto,
      });

      return {
        data: variantOptions,
        message: 'Successfully created variant Option',
      };
    } catch (error) {
      throw new Error(`Failed to create variantOption: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const variantOptions = await this.prisma.variantOptions.findMany({
        select: {
          name: true,
          variant: {
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
          },
        },
      });
      return {
        data: variantOptions,
      };
    } catch (error) {
      throw new Error(`Failed to fetch variantOptions: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const variantOptions = await this.prisma.variantOptions.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          variant: {
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
          },
        },
      });

      if (!variantOptions) return { message: 'VariantOption not found' };
      return {
        data: variantOptions,
      };
    } catch (error) {
      throw new Error(`Failed to find variantOption: ${error.message}`);
    }
  }

  async update(id: number, updateVariantOptionDto: UpdateVariantOptionDto) {
    try {
      const variantOptionId = Number(id);
      const variantOption = await this.prisma.variantOptions.findUnique({
        where: { id: variantOptionId },
      });

      if (!variantOption) return { message: 'VariantOption not found' };

      const updateVariantOption = await this.prisma.variantOptions.update({
        where: { id: variantOptionId },
        data: updateVariantOptionDto,
      });

      return {
        data: updateVariantOption,
        message: 'Successfully updated variant Option',
      };
    } catch (error) {
      throw new Error(`Failed to update variantOption: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const variantOptionId = Number(id);
      const variantOption = await this.prisma.variantOptions.findUnique({
        where: { id: variantOptionId },
      });

      if (!variantOption) return { message: 'Variant Option not found' };
      const deleteVariant = await this.prisma.variantOptions.delete({
        where: { id: variantOptionId },
      });

      return {
        data: deleteVariant,
        message: 'Successfully deleted variant Option',
      };
    } catch (error) {
      throw new Error(`Failed to delete variantOption: ${error.message}`);
    }
  }
}
