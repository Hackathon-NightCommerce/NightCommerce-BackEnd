import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Products} from './products.entities';

@Entity()
export class ImageGallery{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text' })
    image: string;

    @ManyToOne(() => Products, products => products.images, { onDelete: "CASCADE" })
    product:Products

}