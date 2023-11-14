import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Users } from './users.entities'; 
import { Products } from './products.entities';


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
  
    @ManyToOne(() => Products, product => product.itemsCart, {onDelete:'CASCADE'})
    @JoinColumn({ name: 'product_id' })
    product_id: Products;

}