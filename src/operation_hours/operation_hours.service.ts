import { Body, Injectable } from '@nestjs/common';
import { CreateOperationHourDto } from './dto/create-operation_hour.dto';
import { UpdateOperationHourDto } from './dto/update-operation_hour.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OperationHoursService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createOperationHourDto: CreateOperationHourDto) {
    try {
      const { store_id } = createOperationHourDto;
      const { id } = await this.prisma.stores.findUnique({
        where: {
          id: store_id,
        },
      });

      if (!id) {
        return {
          message: 'Store not found',
        };
      }

      const hours = await this.prisma.operationHours.create({
        data: createOperationHourDto,
      });

      return {
        message: 'Succesfully add operation hours',
        data: hours,
      };
    } catch (error) {
      throw new Error(`Failed to create operation hours: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const operation = await this.prisma.operationHours.findMany();

      return {
        message: 'Successfully fetch all data.',
        data: operation,
      };
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const operation_hours = await this.prisma.operationHours.findUnique({
        where: { id },
        select: {
          id: true,
          day: true,
          open_at: true,
          close_at: true,
          store_id: true,
        },
      });

      if (!operation_hours) {
        return {
          message: 'Operation hours not found',
        };
      }
    } catch (error) {
      throw new Error(`Failed to fetch operation stores: ${error.message}`);
    }
  }

  update(id: number, updateOperationHourDto: UpdateOperationHourDto) {
    try {
      const operation = this.prisma.operationHours.update({
        where: {
          id,
        },
        data: updateOperationHourDto,
      });

      return {
        message: 'Succesfully update operation hours',
        data: operation,
      };
    } catch (error) {
      throw new Error(`Failed to update operation hours: ${error.message}`);
    }
  }

  remove(id: number) {
    try {
      const operation = this.prisma.operationHours.delete({
        where: {
          id,
        },
      });

      return {
        message: `Succesfully delete operation hours with id ${id}`,
        data: operation,
      };
    } catch (error) {
      throw new Error(`Failed to delete operation hours: ${error.message}`);
    }
  }
}
