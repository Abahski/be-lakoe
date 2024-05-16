import { Module } from '@nestjs/common';
import { InvoiceHistoriesService } from './invoice_histories.service';
import { InvoiceHistoriesController } from './invoice_histories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InvoiceHistoriesController],
  providers: [InvoiceHistoriesService, PrismaService],
})
export class InvoiceHistoriesModule {}
