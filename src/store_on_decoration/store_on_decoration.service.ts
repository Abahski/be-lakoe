import { Injectable } from '@nestjs/common';
import { CreateStoreOnDecorationDto } from './dto/create-store_on_decoration.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StoreOnDecorationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStoreOnDecorationDto: CreateStoreOnDecorationDto) {
    try {
      const existedDecoration = await this.prisma.storesOnDecorations.findFirst(
        {
          where: {
            store_id: createStoreOnDecorationDto.store_id,
            decoration_id: createStoreOnDecorationDto.decoration_id,
          },
        },
      );
      const notFoundDecorationId = await this.prisma.decoration.findUnique({
        where: { id: createStoreOnDecorationDto.decoration_id },
      });

      if (!notFoundDecorationId) {
        return { message: 'Decoration not found' };
      }

      const notFoundStoreId = await this.prisma.stores.findUnique({
        where: { id: createStoreOnDecorationDto.store_id },
      });

      if (!notFoundStoreId) {
        return { message: 'Store not found' };
      }

      if (existedDecoration) {
        await this.prisma.storesOnDecorations.deleteMany({
          where: {
            decoration_id: createStoreOnDecorationDto.decoration_id,
            store_id: createStoreOnDecorationDto.store_id,
          },
        });

        return {
          message: 'Successfully created storeOnDecoration',
        };
      }

      await this.prisma.storesOnDecorations.create({
        data: {
          ...createStoreOnDecorationDto,
        },
      });

      return {
        message: 'Successfully created storeOnDecoration',
      };
    } catch (error) {
      throw new Error(`Failed to created storeOnDecoration: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const storeOnDecorations = await this.prisma.storesOnDecorations.findMany(
        {
          select: {
            id: true,
            decoration: {
              select: {
                id: true,
                type: true,
              },
            },
            store: {
              select: {
                id: true,
                name: true,
                slogan: true,
                description: true,
                domain: true,
                logo_attachment: true,
                banner_attachment: true,
              },
            },
          },
        },
      );

      return {
        data: storeOnDecorations,
        message: 'Successfully fetched storeOnDecorations',
      };
    } catch (error) {
      throw new Error(`Failed to fetch storeOnDecorations: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const storeOnDecoration =
        await this.prisma.storesOnDecorations.findUnique({
          where: { id },
          select: {
            id: true,
            decoration: {
              select: {
                id: true,
                type: true,
              },
            },
            store: {
              select: {
                id: true,
                name: true,
                slogan: true,
                description: true,
                domain: true,
                logo_attachment: true,
              },
            },
          },
        });

      return {
        message: 'Success!!!',
        data: storeOnDecoration,
      };
    } catch (error) {
      throw new Error(`Failed to find storeOnDecoration: ${error.message}`);
    }
  }
}
