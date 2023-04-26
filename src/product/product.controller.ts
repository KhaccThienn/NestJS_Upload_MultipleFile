import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity';
import { CreateProductDTO } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';
import { Request } from 'express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imgService: ImagesService,
  ) {}
  private logger = new Logger();

  @Get()
  async getAllProd(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          let filename = Date.now() + '-' + file.originalname;
          filename = filename.replaceAll(' ', '_');
          callback(null, filename);
        },
      }),
    }),
  )
  async createProd(
    @Req() req: Request,
    @Body() prod: CreateProductDTO,
    @UploadedFiles()
    images: Array<Express.Multer.File>,
  ): Promise<Product> {
    const savedProd = await this.productService.createProd(prod);
    this.logger.log(savedProd);

    if (savedProd) {
      images.forEach(async (e) => {
        e.filename = 'http://' + req.get('host') + '/uploads/' + e.filename;
        this.logger.log(e.filename);
        await this.imgService.insertImage(savedProd.id, {
          name: e.filename,
        });
      });
    }

    return savedProd;
  }
}
