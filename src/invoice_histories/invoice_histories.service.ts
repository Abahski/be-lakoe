/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateInvoiceHistoryDto } from './dto/create-invoice_history.dto';
import { UpdateInvoiceHistoryDto } from './dto/update-invoice_history.dto';

@Injectable()
export class InvoiceHistoriesService {
  create(_createInvoiceHistoryDto: CreateInvoiceHistoryDto) {
    return 'This action adds a new invoiceHistory';
  }

  findAll() {
    return `This action returns all invoiceHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceHistory`;
  }

  update(id: number, updateInvoiceHistoryDto: UpdateInvoiceHistoryDto) {
    return `This action updates a #${id} invoiceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceHistory`;
  }
}
