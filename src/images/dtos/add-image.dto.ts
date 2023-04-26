/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateImageDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
