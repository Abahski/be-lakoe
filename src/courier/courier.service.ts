import { Injectable } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
// import { UpdateCourierDto } from './dto/update-courier.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Injectable()
export class CourierService {
  constructor(private prisma: PrismaService) {}
  async create(createCourierDto: CreateCourierDto) {
    try {
      const courier = await this.prisma.couriers.create({
        data: createCourierDto,
      });

      return courier;
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
