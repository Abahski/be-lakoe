import { Module } from '@nestjs/common';
import { StoreOnDecorationService } from './store_on_decoration.service';
import { StoreOnDecorationController } from './store_on_decoration.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StoreOnDecorationController],
  providers: [StoreOnDecorationService, PrismaService],
})
export class StoreOnDecorationModule {}
