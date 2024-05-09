export class CreateProductDto {
  name: string;
  description: string;
  attachments: string;
  is_active: boolean;
  minimum_order: number;
  size: string;
}
