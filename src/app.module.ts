import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { VariantsModule } from './variants/variants.module';
import { VariantOptionsModule } from './variant_options/variant_options.module';
import { VariantOptionValuesModule } from './variant_option_values/variant_option_values.module';
import { StoresModule } from './stores/stores.module';
import { BankAccountModule } from './bank_account/bank_account.module';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    AuthModule,
    ProductsModule,
    VariantsModule,
    VariantOptionsModule,
    VariantOptionValuesModule,
    StoresModule,
    BankAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
