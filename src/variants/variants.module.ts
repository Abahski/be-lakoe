import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService, PrismaService],
})
export class VariantsModule {}
