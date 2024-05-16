import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, JwtAuthGuard],
})
export class ProductsModule {}
