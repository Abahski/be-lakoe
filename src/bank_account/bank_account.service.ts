import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BankAccountService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      const bankAccount = await this.prisma.bankAccounts.create({
        data: createBankAccountDto,
      });

      return {
        data: bankAccount,
        message: 'Successfully created bankAccount',
      };
    } catch (error) {
      throw new Error(`Failed to create bankAccount: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const bankAccounts = await this.prisma.bankAccounts.findMany({
        select: {
          bank: true,
          account_name: true,
          account_number: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });

      return {
        data: bankAccounts,
      };
    } catch (error) {
      throw new Error(`Failed to fetch bankAccounts: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const bankAccount = await this.prisma.bankAccounts.findUnique({
        where: { id: id },
        select: {
          bank: true,
          account_name: true,
          account_number: true,
          store: {
            select: {
              name: true,
              slogan: true,
              description: true,
              domain: true,
              logo_attachment: true,
              banner_attachment: true,
            },
          },
        },
      });

      if (!bankAccount) return { message: 'BankAccount not found' };
      return {
        data: bankAccount,
      };
    } catch (error) {
      throw new Error(`Failed to find bankAccount: ${error.message}`);
    }
  }

  async update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    try {
      const bankAccountId = Number(id);
      const bankAccount = await this.prisma.bankAccounts.findUnique({
        where: { id: bankAccountId },
      });

      if (!bankAccount) return { message: 'BankAccount not found' };
      const updateBankAccount = await this.prisma.bankAccounts.update({
        where: { id: bankAccountId },
        data: updateBankAccountDto,
      });

      return {
        data: updateBankAccount,
        message: 'Successfully updated bankAccount',
      };
    } catch (error) {
      throw new Error(`Failed to update bankAccount: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const bankAccountId = Number(id);
      const bankAccount = await this.prisma.bankAccounts.findUnique({
        where: { id: bankAccountId },
      });
      if (!bankAccount) return { message: 'BankAccount not found' };

      const deleteBankAccount = await this.prisma.bankAccounts.delete({
        where: { id: bankAccountId },
      });

      return {
        data: deleteBankAccount,
        message: 'Successfully deleted bankAccount',
      };
    } catch (error) {
      throw new Error(`Failed to delete bankAccount: ${error.message}`);
    }
  }
}
