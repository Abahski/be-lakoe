import { Module } from '@nestjs/common';
import { StoreOnDecorationService } from './store_on_decoration.service';
import { StoreOnDecorationController } from './store_on_decoration.controller';

@Module({
  controllers: [StoreOnDecorationController],
  providers: [StoreOnDecorationService],
})
export class StoreOnDecorationModule {}
