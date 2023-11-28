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

    @Column({type:'int', nullable: true})
    qtd:number

    @Column({ type: "int", nullable: true })
    price: number;

    @ManyToOne(() => Users, user => user.itemsCart,{onDelete:'CASCADE',nullable:true})
    @JoinColumn({ name: 'user_id' })
    user_id:number;
  
    @ManyToOne(() => Adverts, adverts => adverts.itemsCart, {onDelete:'CASCADE',nullable:true})
    @JoinColumn({ name: 'advert_id' })
    advert_id: number;

}