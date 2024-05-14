import { Module } from '@nestjs/common';
import { VariantOptionsService } from './variant_options.service';
import { VariantOptionsController } from './variant_options.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VariantOptionsController],
  providers: [VariantOptionsService, PrismaService],
})
export class VariantOptionsModule {}
