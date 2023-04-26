import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto';
import { Images } from 'src/images/entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,

    @InjectRepository(Images)
    private readonly imgRepository: Repository<Images>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.prodRepository.find({
      relations: ['images'],
    });
  }

  async createProd(prod: CreateProductDTO): Promise<Product> {
    return await this.prodRepository.save(prod);
  }
}
