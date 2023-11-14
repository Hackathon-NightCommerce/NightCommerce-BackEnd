import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1699983933870 implements MigrationInterface {
    name = 'CreateTables1699983933870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" text NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "road" text NOT NULL, "number" text NOT NULL, "complement" text NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_gallery" ("id" SERIAL NOT NULL, "image" text NOT NULL, "productId" integer, CONSTRAINT "PK_278b7928303c6293cf98ed65172" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "brand" text NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "cover_image" text NOT NULL, "information_additional" character varying(250), "category" text NOT NULL, "published" boolean, "qtd" integer NOT NULL, "promotion" boolean, "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "cpf" character varying(14) NOT NULL, "phone" bigint NOT NULL, "birth_date" date NOT NULL, "description" text NOT NULL, "confirmed" boolean NOT NULL, "password" text NOT NULL, "type_user" text NOT NULL, "reset_token" character varying, "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_cart" ("id" SERIAL NOT NULL, "qtd" integer NOT NULL, "price" integer NOT NULL, "user_id" integer, "product_id" integer, CONSTRAINT "PK_e18e87dca227ffef10b99c8dae3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_b0abf1362e6399bb8605ffc99d1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_cart" ADD CONSTRAINT "FK_370ec74916872f01beff7f7b904" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_cart" ADD CONSTRAINT "FK_c79292ff6fc047ec4e62e0ea153" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_cart" DROP CONSTRAINT "FK_c79292ff6fc047ec4e62e0ea153"`);
        await queryRunner.query(`ALTER TABLE "items_cart" DROP CONSTRAINT "FK_370ec74916872f01beff7f7b904"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_b0abf1362e6399bb8605ffc99d1"`);
        await queryRunner.query(`DROP TABLE "items_cart"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "image_gallery"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
