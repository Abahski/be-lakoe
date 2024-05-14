import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService],
})
export class CartItemsModule {}
