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

export enum FuelType {
  FLEX = "flex",
  HIBRIDO = "hibrido",
  ELETRICO = "eletrico"
}

@Entity()
export class Adverts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  brand: string;

  @Column({ type: "text", nullable: false })
  model: string;

  @Column({ type: "int", nullable: false })
  year: number;

  @Column({ type: "text", nullable: false })
  fuel: FuelType;

  @Column({ type: "int", nullable: false })
  mileage: number;

  @Column({ type: "text", nullable: false })
  color: string;

  @Column({ type: "boolean", nullable: false })
  table_fipe: boolean;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: false })
  cover_image: string;

  @Column({ type: "boolean", nullable: false })
  published: boolean;

  @ManyToOne(() => Users, (user) => user.adverts, { onDelete: 'CASCADE' } )
  user: Users;

  @OneToMany(() => ImageGallery, (gallery) => gallery.adverts)
  images: ImageGallery[];

  @OneToMany(() => Comments, (comment) => comment.advert)
  comments: Comments[];
}
