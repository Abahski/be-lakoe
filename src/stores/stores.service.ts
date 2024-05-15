import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma.service';
import { storeValidation } from 'src/util/validation/stores/storeCreate';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStoreDto: CreateStoreDto) {
    try {
      const { error } = storeValidation.validate(CreateStoreDto);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const isExists = await this.prisma.stores.findFirst({
        where: {
          name: CreateStoreDto.name,
        },
      });

      if (isExists) {
        throw new Error('Store name already exist');
      }

      const store = await this.prisma.stores.create({
        data: createStoreDto,
      });
      return {
        data: store,
        message: 'Successfully created store',
      };
    } catch (error) {
      throw new Error(`Failed to create store: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const stores = await this.prisma.stores.findMany({
        select: {
          name: true,
          slogan: true,
          description: true,
          domain: true,
          logo_attachment: true,
          banner_attachment: true,
        },
      });
      return {
        data: stores,
      };
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const store = await this.prisma.stores.findUnique({
        where: { id },
        select: {
          name: true,
          slogan: true,
          description: true,
          domain: true,
          logo_attachment: true,
          banner_attachment: true,
        },
      });
      console.log(store);

      return {
        data: store,
      };
    } catch (error) {
      throw new Error(`Failed to find store: ${error.message}`);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try {
      const storeId = Number(id);
      const store = await this.prisma.stores.findUnique({
        where: { id: storeId },
      });

      if (!store) {
        return { message: 'Store not found' };
      }
      const updateStore = await this.prisma.stores.update({
        where: { id: storeId },
        data: updateStoreDto,
      });

      return {
        data: updateStore,
        message: 'Successfully updated store',
      };
    } catch (error) {
      throw new Error(`Failed to update store: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const storeId = Number(id);
      const store = await this.prisma.stores.findUnique({
        where: { id: storeId },
      });

      if (!store) {
        return { message: 'Store not found' };
      }

      const deleteStore = await this.prisma.stores.delete({
        where: { id: storeId },
      });

      return {
        data: deleteStore,
        message: 'Successfully deleted store',
      };
    } catch (error) {
      throw new Error(`Failed to delete store: ${error.message}`);
    }
  }
}
