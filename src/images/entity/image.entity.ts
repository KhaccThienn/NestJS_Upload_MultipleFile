/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entity';
import { Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { JoinColumn } from 'typeorm';

@Entity({
    name: 'images'
})
export class Images {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'text'
    })
    name: string;

    @ManyToOne(() => Product, (prod) => prod.images)
    prod: Product;

    @JoinColumn()
    product: Product;
};
