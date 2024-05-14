import { Injectable } from '@nestjs/common';
import { CreateCouryDto } from './dto/create-coury.dto';
// import { UpdateCouryDto } from './dto/update-coury.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CouriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCouryDto: CreateCouryDto) {
    const coury = await this.prisma.couriers.create({
      data: {
        ...createCouryDto,
      },
    });
    console.log(coury, 'test');
    return coury;
  }

  findAll() {
    return `This action returns all couries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coury`;
  }

  // update(id: number, updateCouryDto: UpdateCouryDto) {
  //   return `This action updates a #${id} coury`;
  // }

  remove(id: number) {
    return `This action removes a #${id} coury`;
  }
}
