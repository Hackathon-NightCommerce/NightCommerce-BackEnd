import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entities";
import { Products } from "./products.entities";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  comment: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToOne(() => Users, (users) => users.comments, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => Products, (products) => products.comments, { onDelete: "CASCADE" })
  product: Products;
}
