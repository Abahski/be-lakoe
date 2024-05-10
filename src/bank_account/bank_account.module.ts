import { Module } from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { BankAccountController } from './bank_account.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BankAccountController],
  providers: [BankAccountService, PrismaService],
})
export class BankAccountModule {}
