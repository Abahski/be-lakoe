import { Body, Injectable } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
// import { UpdateCourierDto } from './dto/update-courier.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Injectable()
export class CourierService {
  constructor(private prisma: PrismaService) {}
  async create(@Body() createCourierDto: CreateCourierDto) {
    try {
      const { invoice_id } = createCourierDto;
      const { id } = await this.prisma.invoice.findUnique({
        where: {
          id: invoice_id,
        },
      });
      if (!id) {
        throw new Error('invoice not found');
      }
      const courier = await this.prisma.couriers.create({
        data: createCourierDto,
      });

      return {
        message: 'Berhasil, yeayy!!!',
        data: courier,
      };
    } catch (error) {
      console.error('error create courier : ', error);
    }
  }

  async findAll() {
    try {
      const couriers = await this.prisma.couriers.findMany({
        select: {
          id: true,
          courier_code: true,
          courier_service_name: true,
          courier_service_code: true,
          price: true,
          invoice_id: true,
        },
      });
      return couriers;
    } catch (error) {
      console.error('error create courier : ', error);
    }
  }

  async findOne(id: number) {
    try {
      const courier = await this.prisma.couriers.findUnique({
        where: { id },
        select: {
          id: true,
          courier_code: true,
          courier_service_name: true,
          courier_service_code: true,
          price: true,
          invoice_id: true,
        },
      });
      return courier;
    } catch (error) {
      console.error('error create courier : ', error);
    }
  }

  update(id: number, updateCourierDto: UpdateCourierDto) {
    try {
      const invoice = this.prisma.couriers.update({
        where: { id },
        data: updateCourierDto,
      });
      return invoice;
    } catch (error) {
      console.error('error update courier : ', error);
    }
  }

  remove(id: number) {
    try {
      const invoice = this.prisma.couriers.delete({
        where: { id },
      });
      return invoice;
    } catch (error) {
      console.error('error remove courier : ', error);
    }
  }
}
