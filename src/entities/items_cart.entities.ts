import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Users } from './users.entities'; 
import { Adverts } from './adverts.entities';


@Entity()
export class ItemsCart{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int', nullable: false})
    qtd:number

    @Column({ type: "int", nullable: false })
    price: number;

    @ManyToOne(() => Users, user => user.itemsCart,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user_id: Users;
  
    @ManyToOne(() => Adverts, adverts => adverts.itemsCart, {onDelete:'CASCADE'})
    @JoinColumn({ name: 'advert_id' })
    product_id: Adverts;
    advert_id: any;

}