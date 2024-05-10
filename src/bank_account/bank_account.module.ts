import { Module } from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { BankAccountController } from './bank_account.controller';

@Module({
  controllers: [BankAccountController],
  providers: [BankAccountService],
})
export class BankAccountModule {}
