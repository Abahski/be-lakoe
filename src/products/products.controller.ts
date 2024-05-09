import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const ProductInput: Prisma.ProductsCreateInput = {
        name: createProductDto.name,
        description: createProductDto.description,
        attachments: createProductDto.attachments,
        is_active: createProductDto.is_active,
        minimum_order: createProductDto.minimum_order,
        size: createProductDto.size,
      };
      console.log(ProductInput);

      const result = await this.productsService.createProduct(ProductInput);

      return {
        data: result,
        message: 'create product success',
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
