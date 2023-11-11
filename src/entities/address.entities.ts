import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  cep: string;

  @Column({ type: "text", nullable: false })
  state: string;

  @Column({ type: "text", nullable: false })
  city: string;

  @Column({ type: "text", nullable: false })
  road: string;

  @Column({ type: "text", nullable: false })
  number: string;

  @Column({ type: "text", nullable: false })
  complement: string;


}
