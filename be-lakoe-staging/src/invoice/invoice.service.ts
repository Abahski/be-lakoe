import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
// import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  async create(CreateInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = await this.prisma.invoice.create({
        data: {
          prices: CreateInvoiceDto.prices,
          service_charge: CreateInvoiceDto.service_charge,
          status: CreateInvoiceDto.status,
          receiver_longitude: CreateInvoiceDto.receiver_longitude,
          receiver_latitude: CreateInvoiceDto.receiver_latitude,
          receiver_district: CreateInvoiceDto.receiver_district,
          receiver_phone: CreateInvoiceDto.receiver_phone,
          receiver_name: CreateInvoiceDto.receiver_name,
          receiver_address: CreateInvoiceDto.receiver_address,
          user: { connect: { id: CreateInvoiceDto.userId } },
          cart: { connect: { id: CreateInvoiceDto.cartId } },
        },
      });
      return invoice;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const invoice = await this.prisma.invoice.findMany({
      include: {
        user: true,
        cart: true,
      },
    });

    return invoice;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  // update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
  //   return `This action updates a #${id} invoice`;
  // }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
