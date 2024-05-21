import { StatusInvoice } from '@prisma/client';

export class CreateInvoiceHistoryDto {
  status: StatusInvoice;
  invoice_id: number;
}
