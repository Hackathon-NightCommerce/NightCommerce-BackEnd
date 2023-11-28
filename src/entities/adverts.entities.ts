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
import { ItemsCart } from "./items_cart.entities";

export enum CategoryProduct {
  Eletronicos = "Eletrônicos",
  ModaEVestuario = "Moda e Vestuário",
  CasaECozinha = "Casa e Cozinha",
  LivrosEMidia = "Livros e Mídia",
  BelezaECuidadosPessoais = "Beleza e Cuidados Pessoais",
  EsportesELazer = "Esportes e Lazer",
  BrinquedosEJogos = "Brinquedos e Jogos",
  SaudeEBemEstar = "Saúde e Bem-Estar",
  Automotivo = "Automotivo",
  AlimentosEBebidas = "Alimentos e Bebidas",
  MoveisEDecoracao = "Móveis e Decoração",
  Outros="outros"
}

@Entity()
export class Adverts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 250 })
  name: string;

  @Column({ type: "text", nullable: false })
  brand: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: false })
  cover_image: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  information_additional: string | null;

  @Column({
    type: "enum",
    enum: CategoryProduct,
    default: CategoryProduct.Outros,
  })
  category: CategoryProduct;

  @Column({ type: "boolean", nullable: true })
  published: boolean;

  @Column({ type: "int", nullable: false })
  qtd: number;

  @Column({ type: "boolean", nullable: true })
  promotion: boolean;

  @ManyToOne(() => Users, (user) => user.adverts, { onDelete: "CASCADE" })
  user: Users;

  @OneToMany(() => ImageGallery, (gallery) => gallery.adverts)
  images: ImageGallery[];

  @OneToMany(() => Comments, (comment) => comment.advert)
  comments: Comments[];

  @OneToMany(() => ItemsCart, (itemCart) => itemCart.advert_id)
  itemsCart: ItemsCart[];
}
