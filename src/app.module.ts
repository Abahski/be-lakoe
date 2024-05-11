import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { VariantsModule } from './variants/variants.module';
import { VariantOptionsModule } from './variant_options/variant_options.module';
import { VariantOptionValuesModule } from './variant_option_values/variant_option_values.module';
import { StoresModule } from './stores/stores.module';
import { BankAccountModule } from './bank_account/bank_account.module';
import { LocationsModule } from './locations/locations.module';
import { MessageTemplatesModule } from './message-templates/message-templates.module';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    VariantsModule,
    VariantOptionsModule,
    VariantOptionValuesModule,
    StoresModule,
    BankAccountModule,
    LocationsModule,
    MessageTemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
