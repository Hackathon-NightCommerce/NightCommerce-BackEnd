import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entities";
import { Adverts} from "./adverts.entities";

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

  @ManyToOne(() => Adverts, (adverts) => adverts.comments, { onDelete: "CASCADE" })
  advert: Adverts;
}
