import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceHistoryDto } from './create-invoice_history.dto';

export class UpdateInvoiceHistoryDto extends PartialType(
  CreateInvoiceHistoryDto,
) {}
