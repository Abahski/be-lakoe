import { Module } from '@nestjs/common';
import { VariantOptionValuesService } from './variant_option_values.service';
import { VariantOptionValuesController } from './variant_option_values.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VariantOptionValuesController],
  providers: [VariantOptionValuesService, PrismaService],
})
export class VariantOptionValuesModule {}
