import { Module, forwardRef } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entity';
import { Product } from 'src/product/entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Images]),
    forwardRef(() => ProductModule),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [TypeOrmModule],
})
export class ImagesModule {}
