import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
// import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = this.prisma.invoice.create({
        data: {
          prices: createInvoiceDto.prices,
          service_charge: createInvoiceDto.service_charge,
          status: createInvoiceDto.status,
          receiver_longitude: createInvoiceDto.receiver_longitude,
          receiver_latitude: createInvoiceDto.receiver_latitude,
          receiver_district: createInvoiceDto.receiver_district,
          receiver_phone: createInvoiceDto.receiver_phone,
          receiver_name: createInvoiceDto.receiver_name,
          receiver_address: createInvoiceDto.receiver_address,
          courier_id: createInvoiceDto.courier_id,
          cart_id: createInvoiceDto.cart_id,
          userId: createInvoiceDto.userId,
        },
      });

      return invoice;
    } catch (error) {
      console.error('error create invoice : ', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const invoices = await this.prisma.invoice.findMany({
        select: {
          id: true,
          prices: true,
          service_charge: true,
          status: true,
          receiver_longitude: true,
          receiver_latitude: true,
          receiver_district: true,
          receiver_phone: true,
          receiver_name: true,
          receiver_address: true,
          cart_id: true,
          userId: true,
        },
      });

      return invoices;
    } catch (error) {
      console.error('error create invoice : ', error);
    }
  }

  async findOne(id: number) {
    try {
      const invoice = await this.prisma.invoice.findFirst({
        where: { id },
        select: {
          id: true,
          prices: true,
          status: true,
          receiver_longitude: true,
          receiver_latitude: true,
          receiver_district: true,
          receiver_phone: true,
          receiver_name: true,
          receiver_address: true,
          cart_id: true,
          userId: true,
        },
      });

      if (!invoice) {
        throw new Error(`Invoice with ID ${id} not found`);
      }

      return invoice;
    } catch (error) {
      console.error(`Error fetching invoice with ID ${id}: `, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.invoice.delete({
        where: { id },
      });
      return { message: `Successfully removed invoice with ID ${id}` };
    } catch (error) {
      console.error(`Error removing invoice with ID ${id}: `, error);
      throw error;
    }
  }

  async update(id: number, updateInvoiceDto: any) {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
    return updatedInvoice;
  }
}
