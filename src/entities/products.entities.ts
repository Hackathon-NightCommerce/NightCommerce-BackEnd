import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entities";
import { ImageGallery } from "./imageGallery.entities";
import { Comments } from "./comments.entities";
import {ItemsCart} from './items_cart.entities';

export enum category_product{
  Informatica,
  Notekook,
  Impressoras,
  SmartPhones,
  Domestico,
  Tvs
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length:250, nullable:false})
  name: string;

  @Column({ type: "text", nullable: false })
  brand: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: false })
  cover_image: string;

  @Column({type:'varchar', length:250, nullable:true})
  information_additional:string

  @Column({type:'text', nullable: false})
  category: category_product

  @Column({ type: "boolean", nullable: true })
  published: boolean;

  @Column({type:'int', nullable: false})
  qtd:number

  @Column({ type: "boolean", nullable: true })
  promotion: boolean;

  @ManyToOne(() => Users, (user) => user.products, { onDelete: 'CASCADE' } )
  user: Users;

  @OneToMany(() => ImageGallery, (gallery) => gallery.product)
  images: ImageGallery[];

  @OneToMany(() => Comments, (comment) => comment.product)
  comments: Comments[];

  @OneToMany(() => ItemsCart, itemCart => itemCart.product_id)
  itemsCart: ItemsCart[];
}
