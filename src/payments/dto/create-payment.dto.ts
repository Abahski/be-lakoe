import { StatusPayment } from '@prisma/client';

export class CreatePaymentDto {
  bank: string;
  amount: number;
  status: StatusPayment;
  invoice_id: number;
  user_id: number;
}
