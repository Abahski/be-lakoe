export class CreatePaymentDto {
  bank: string;
  amount: number;
  status: string;
  invoice_id: number;
  user_id: number;
}
