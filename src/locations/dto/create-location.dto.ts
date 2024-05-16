export class CreateLocationDto {
  name: string;
  address: string;
  postal_code: string;
  city_district: string;
  longitude: number;
  latitude: number;
  is_main_locations: boolean;
  store_id: number;
  profile_id: number;
}
