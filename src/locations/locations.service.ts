import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLocationDto: CreateLocationDto) {
    try {
      const location = await this.prisma.locations.create({
        data: createLocationDto,
      });
      return {
        data: location,
        message: 'Successfully created location',
      };
    } catch (error) {
      throw new Error(`Failed to create location: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const locations = await this.prisma.locations.findMany({
        select: {
          name: true,
          address: true,
          postal_code: true,
          city_district: true,
          longitude: true,
          latitude: true,
          is_main_locations: true,
          store_id: true,
          profile_id: true,
        },
      });
      return {
        data: locations,
        message: 'Successfully fetched locations',
      };
    } catch (error) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const locations = await this.prisma.locations.findUnique({
        where: { id },
      });
      return {
        data: locations,
        message: 'Successfully fetched location',
      };
    } catch (error) {
      throw new Error(`Failed to find location: ${error.message}`);
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const locationId = Number(id);
      const locations = await this.prisma.locations.findUnique({
        where: { id: locationId },
      });
      if (!locations) {
        return { message: 'Location not found' };
      }

      const updateLocations = await this.prisma.locations.update({
        where: { id: locationId },
        data: updateLocationDto,
      });

      return {
        data: updateLocations,
        message: 'Successfully updated location',
      };
    } catch (error) {
      throw new Error(`Failed to update location: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const locId = Number(id);
      const location = await this.prisma.locations.findUnique({
        where: { id: locId },
      });
      if (!location) {
        return {
          message: 'Location not found',
        };
      }

      const locationDelete = await this.prisma.locations.delete({
        where: { id: locId },
      });

      return {
        data: locationDelete,
        message: 'Successfuly delete location',
      };
    } catch (error) {
      throw new Error(`Failed to delete location: ${error.message}`);
    }
  }
}
