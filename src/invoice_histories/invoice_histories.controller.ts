import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceHistoriesService } from './invoice_histories.service';
import { CreateInvoiceHistoryDto } from './dto/create-invoice_history.dto';
import { UpdateInvoiceHistoryDto } from './dto/update-invoice_history.dto';

@Controller('invoice-histories')
export class InvoiceHistoriesController {
  constructor(
    private readonly invoiceHistoriesService: InvoiceHistoriesService,
  ) {}

  @Post()
  create(@Body() createInvoiceHistoryDto: CreateInvoiceHistoryDto) {
    return this.invoiceHistoriesService.create(createInvoiceHistoryDto);
  }

  @Get()
  findAll() {
    return this.invoiceHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceHistoryDto: UpdateInvoiceHistoryDto,
  ) {
    return this.invoiceHistoriesService.update(+id, updateInvoiceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceHistoriesService.remove(+id);
  }
}
