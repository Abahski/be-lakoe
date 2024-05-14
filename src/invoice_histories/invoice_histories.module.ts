import { Module } from '@nestjs/common';
import { InvoiceHistoriesService } from './invoice_histories.service';
import { InvoiceHistoriesController } from './invoice_histories.controller';

@Module({
  controllers: [InvoiceHistoriesController],
  providers: [InvoiceHistoriesService],
})
export class InvoiceHistoriesModule {}
