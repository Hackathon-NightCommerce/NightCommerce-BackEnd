import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { getRounds, hashSync } from "bcryptjs"
import { Address } from "./address.entities"
import {Adverts } from "./adverts.entities"
import { Comments } from "./comments.entities"
import {ItemsCart} from './items_cart.entities';

export enum UserType {
  CUSTOMER = "customer",
  SELLER = "seller",
  ADMIN = "admin",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text", nullable: false })
  name: string

  @Column({ type: "text", nullable: false, unique: true })
  email: string

  @Column({ type: "varchar", length: 14, nullable: false, unique: true })
  cpf: string

  @Column({ type: "bigint", nullable: false })
  phone: string

  @Column({ type: "date", nullable: false })
  birth_date: Date

  @Column({ type: "text", nullable: false })
  description: string

  @Column({type:'boolean',nullable:false})
  confirmed:boolean

  @Column({ type: "text", nullable: false })
  password: string

  @Column({ type: "text", nullable: false })
  type_user: UserType

  @Column({ type: "varchar", nullable: true })
  reset_token: string | null

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

  @OneToMany(() => Adverts, (adverts) => adverts.user)
  adverts: Adverts[]

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[]

  @OneToMany(() => ItemsCart, itemCart => itemCart.user_id)
  itemsCart: ItemsCart[];

  @BeforeInsert()
  @BeforeUpdate()
  cryptoPasswordUpdate() {
    const isEncripted = getRounds(this.password)
    if (!isEncripted) {
      this.password = hashSync(this.password, 10)
    }
  }
}
