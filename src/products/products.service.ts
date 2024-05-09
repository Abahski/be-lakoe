import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const result = await this.prisma.products.create({
        data: createProductDto,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
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

      return updateProduct;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
