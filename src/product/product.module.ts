import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity';
import { ImagesModule } from 'src/images/images.module';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => ImagesModule),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImagesService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
