import { Injectable } from '@nestjs/common';
import { CreateVariantOptionValueDto } from './dto/create-variant_option_value.dto';
import { UpdateVariantOptionValueDto } from './dto/update-variant_option_value.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantOptionValuesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVariantOptionValueDto: CreateVariantOptionValueDto) {
    try {
      const variantOptionValue = await this.prisma.variantOptionValues.create({
        data: createVariantOptionValueDto,
      });
      return {
        data: variantOptionValue,
        message: 'Successfully created variant Option Value',
      };
    } catch (error) {
      throw new Error(`Failed to create variantOptionValue: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const variantOptionValues =
        await this.prisma.variantOptionValues.findMany({
          select: {
            sku: true,
            weight: true,
            stock: true,
            price: true,
            variant_option: {
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
            },
          },
        });

      return {
        data: variantOptionValues,
      };
    } catch (error) {
      throw new Error(`Failed to fetch variantOptionValues: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const variantOptionValue =
        await this.prisma.variantOptionValues.findUnique({
          where: { id },
          select: {
            sku: true,
            weight: true,
            stock: true,
            price: true,
            variant_option: {
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
            },
          },
        });

      if (!variantOptionValue) {
        throw new Error('Variant Option Value not found');
      }

      return variantOptionValue;
    } catch (error) {
      throw new Error(`Failed to find variantOptionValue: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateVariantOptionValueDto: UpdateVariantOptionValueDto,
  ) {
    try {
      const variantOptionValueId = Number(id);
      const variantOptionValue =
        await this.prisma.variantOptionValues.findUnique({
          where: { id: variantOptionValueId },
        });

      if (!variantOptionValue) {
        return { message: 'Variant Option Value not found' };
      }

      const UpdateVariantOptionValue =
        await this.prisma.variantOptionValues.update({
          where: { id: variantOptionValueId },
          data: updateVariantOptionValueDto,
        });

      return {
        data: UpdateVariantOptionValue,
        message: 'Successfully updated variant Option Value',
      };
    } catch (error) {
      throw new Error(`Failed to update variantOptionValue: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const variantOptionValueId = Number(id);
      const variantOptionValue =
        await this.prisma.variantOptionValues.findUnique({
          where: { id: variantOptionValueId },
        });

      if (!variantOptionValue) {
        return { message: 'Variant Option Value not found' };
      }
      const deleteVariantOptionValue =
        await this.prisma.variantOptionValues.delete({
          where: { id: variantOptionValueId },
        });
      return {
        data: deleteVariantOptionValue,
        message: 'Successfully deleted variant Option Value',
      };
    } catch (error) {
      throw new Error(`Failed to delete variantOptionValue: ${error.message}`);
    }
  }
}
