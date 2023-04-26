import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity';
import { Repository } from 'typeorm';
import { Images } from './entity';
import { CreateImageDTO } from './dtos';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,

    @InjectRepository(Images)
    private readonly imgRepository: Repository<Images>,
  ) {}

  async insertImage(prodID: number, image: CreateImageDTO): Promise<Images> {
    const prod = await this.prodRepository.findOne({
      where: [{ id: prodID }],
    });
    if (!prod) {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
    return this.imgRepository.save({ ...image, prod });
  }
}
