/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  price: number;
}
