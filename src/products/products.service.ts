import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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
        },
      });
      return product;
    } catch (error) {
      throw new Error(`Failed to find product: ${error.message}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productId = Number(id);
      const product = await this.prisma.products.update({
        where: { id: productId },
        data: updateProductDto,
      });

      return product;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const productId = Number(id);
      const product = await this.prisma.products.delete({
        where: { id: productId },
      });

      return product;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}
