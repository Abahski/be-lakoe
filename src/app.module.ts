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

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    VariantsModule,
    VariantOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
