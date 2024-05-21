export class CreateCategoryDto {
  id?: number;
  name?: string;
  product_id?: number;
  parent_id?: number | null;
  children_id?: number | null;
}
