import { Body, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    try {
      const { variant_option_value_id } = createCartItemDto;

      const variantOptionValue =
        await this.prisma.variantOptionValues.findUnique({
          where: { id: variant_option_value_id },
        });

      if (!variantOptionValue) {
        return {
          message: 'Variant Option Value not found',
        };
      }

      const cartItem = await this.prisma.cartItems.create({
        data: createCartItemDto,
      });

      return {
        data: cartItem,
        message: 'Successfully created cartItem',
      };
    } catch (error) {
      throw new Error(`Failed to create cartItem: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const cartItems = await this.prisma.cartItems.findMany({
        include: {
          cart: {
            select: {
              id: true,
              price: true,
              discounts: true,
            },
          },
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
        data: cartItems,
      };
    } catch (error) {
      throw new Error(`Failed to fetch cartItems: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const cartItem = await this.prisma.cartItems.findUnique({
        where: { id },
        include: {
          cart: {
            select: {
              id: true,
              price: true,
              discounts: true,
            },
          },
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

      if (!cartItem) {
        return {
          message: 'CartItem not found',
        };
      }

      return {
        data: cartItem,
      };
    } catch (error) {
      throw new Error(`Failed to find cartItem: ${error.message}`);
    }
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    try {
      const cartItemId = Number(id);
      const cartItem = this.prisma.cartItems.findUnique({
        where: { id: cartItemId },
      });

      if (!cartItem) {
        return {
          message: 'CartItem not found',
        };
      }

      const updateCartItem = this.prisma.cartItems.update({
        where: { id },
        data: updateCartItemDto,
      });

      return {
        data: updateCartItem,
        message: 'Successfully updated cartItem',
      };
    } catch (error) {
      throw new Error(`Failed to update cartItem: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const cartItemId = Number(id);
      const cartItem = this.prisma.cartItems.findUnique({
        where: { id: cartItemId },
      });

      if (!cartItem) {
        return {
          message: 'CartItem not found',
        };
      }

      const deleteCartItem = this.prisma.cartItems.delete({
        where: { id },
      });

      return {
        data: deleteCartItem,
        message: 'Successfully deleted cartItem',
      };
    } catch (error) {
      throw new Error(`Failed to delete cartItem: ${error.message}`);
    }
  }
}
