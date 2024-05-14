import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCartDto: CreateCartDto) {
    try {
      const cart = await this.prisma.carts.create({
        data: createCartDto,
      });

      return {
        data: cart,
        message: 'Successfully created cart',
      };
    } catch (error) {
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const carts = await this.prisma.carts.findMany({
        select: {
          price: true,
          discounts: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          store: {
            select: {
              id: true,
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
        data: carts,
      };
    } catch (error) {
      throw new Error(`Failed to fetch carts: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.prisma.carts.findUnique({
        where: { id },
        select: {
          price: true,
          discounts: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          store: {
            select: {
              id: true,
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
        data: cart,
      };
    } catch (error) {
      throw new Error(`Failed to find cart: ${error.message}`);
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const cartId = Number(id);
      const cart = await this.prisma.carts.findUnique({
        where: { id: cartId },
      });

      if (!cart) {
        return { message: 'Cart not found' };
      }

      const updateCart = await this.prisma.carts.update({
        where: { id },
        data: updateCartDto,
      });

      return {
        data: updateCart,
        message: 'Successfully updated cart',
      };
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const cartId = Number(id);
      const cart = await this.prisma.carts.findUnique({
        where: { id: cartId },
      });

      if (!cart) {
        return { message: 'Cart not found' };
      }

      const deleteCart = await this.prisma.carts.delete({
        where: { id: cartId },
      });

      return {
        data: deleteCart,
        message: 'Successfully deleted cart',
      };
    } catch (error) {
      throw new Error(`Failed to delete cart: ${error.message}`);
    }
  }
}
