import {
  MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
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
import { JwtMiddleware } from './middleware/jwt.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProductsController } from './products/products.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { StoresController } from './stores/stores.controller';
import { VariantOptionValuesController } from './variant_option_values/variant_option_values.controller';
import { VariantOptionsController } from './variant_options/variant_options.controller';
import { VariantsController } from './variants/variants.controller';
import { BankAccountController } from './bank_account/bank_account.controller';
import { RolesModule } from './roles/roles.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { CartsController } from './carts/carts.controller';
import { CartItemsController } from './cart-items/cart-items.controller';
import { RolesController } from './roles/roles.controller';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesController } from './invoices/invoices.controller';
import { CourierModule } from './courier/courier.module';

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
    RolesModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '4h' },
    }),
    CartsModule,
    CartItemsModule,
    InvoicesModule,
    CourierModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
  exports: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(ProfilesController);
    consumer.apply(JwtMiddleware).forRoutes(ProductsController);
    consumer.apply(JwtMiddleware).forRoutes(StoresController);
    consumer.apply(JwtMiddleware).forRoutes(VariantsController);
    consumer.apply(JwtMiddleware).forRoutes(VariantOptionsController);
    consumer.apply(JwtMiddleware).forRoutes(VariantOptionValuesController);
    consumer.apply(JwtMiddleware).forRoutes(BankAccountController);
    consumer.apply(JwtMiddleware).forRoutes(CartsController);
    consumer.apply(JwtMiddleware).forRoutes(CartItemsController);
    consumer.apply(JwtMiddleware).forRoutes(RolesController);
    consumer.apply(JwtMiddleware).forRoutes(InvoicesController);
  }
}
