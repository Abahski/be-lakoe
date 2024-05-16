import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { UserSelector } from 'src/users/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post('create')
  create(
    @Body()
    createCartItemDto: CreateCartItemDto,
    @UserSelector() user: User,
  ) {
    createCartItemDto.user_id = user.id;
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
