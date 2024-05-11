import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { productValidation } from 'src/util/validation/product';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const { error, value } = productValidation.validate(createProductDto);

      if (error) {
        return {
          message: error.details[0].message,
        };
      }

      const { store_id } = value;

      const existingStore = await this.prisma.stores.findUnique({
        where: { id: store_id },
      });

      if (!existingStore) {
        return {
          message: 'Invalid store provided.',
        };
      }

      const product = await this.prisma.products.create({
        data: value,
      });

      return {
        data: product,
        message: 'Successfully created product',
      };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.products.findMany({
        select: {
          name: true,
          description: true,
          attachments: true,
          is_active: true,
          minimum_order: true,
          size: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });
      return {
        data: products,
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async findActive() {
    try {
      const products = await this.prisma.products.findMany({
        where: {
          is_active: true,
        },
        select: {
          name: true,
          description: true,
          attachments: true,
          is_active: true,
          minimum_order: true,
          size: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });

      return {
        data: products,
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async findInactive() {
    try {
      const products = await this.prisma.products.findMany({
        where: {
          is_active: false,
        },
        select: {
          name: true,
          description: true,
          attachments: true,
          is_active: true,
          minimum_order: true,
          size: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });

      return {
        data: products,
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.products.findUnique({
        where: { id },
        select: {
          name: true,
          description: true,
          attachments: true,
          is_active: true,
          minimum_order: true,
          size: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });

      if (!product) return { message: 'Product not found' };
      return {
        data: product,
      };
    } catch (error) {
      throw new Error(`Failed to find product: ${error.message}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productId = Number(id);

      const product = await this.prisma.products.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return { message: 'Product not found' };
      }

      const updateProduct = await this.prisma.products.update({
        where: { id: productId },
        data: updateProductDto,
      });

      return {
        data: updateProduct,
        message: 'Successfully updated product',
      };
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const productId = Number(id);
      const product = await this.prisma.products.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return { message: 'Product not found' };
      }
      const deleteProduct = await this.prisma.products.delete({
        where: { id: productId },
      });

      return {
        data: deleteProduct,
        message: 'Successfully deleted product',
      };
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}
