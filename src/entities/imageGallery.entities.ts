import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Adverts} from './adverts.entities';

@Entity()
export class ImageGallery{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'text' })
    image: string;

    @ManyToOne(() => Adverts, adverts => adverts.images, { onDelete: "CASCADE" })
    adverts:Adverts

}