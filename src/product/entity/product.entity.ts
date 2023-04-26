/* eslint-disable prettier/prettier */
import { Images } from 'src/images/entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'product',
})
export class Product {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'name',
    })
    name: string;

    @Column({
        type: 'float',
        name: 'price',
    })
    price: number;

    @OneToMany(() => Images, (images) => images.prod)
    images: Images[];

    @JoinColumn()
    image: Images[];
}
