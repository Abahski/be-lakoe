export class CreateInvoiceDto {
  prices: number;
  service_charge: number;
  status: string;
  receiver_longitude: number;
  receiver_latitude: number;
  receiver_district: string;
  receiver_phone: string;
  receiver_name: string;
  receiver_address: string;
  userId: number;
  cartId: number;
}
