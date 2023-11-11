import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1693871036275 implements MigrationInterface {
    name = 'CreateDatabase1693871036275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" text NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "road" text NOT NULL, "number" text NOT NULL, "complement" text NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_gallery" ("id" SERIAL NOT NULL, "image" text NOT NULL, "advertsId" integer, CONSTRAINT "PK_278b7928303c6293cf98ed65172" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adverts" ("id" SERIAL NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "fuel" text NOT NULL, "mileage" integer NOT NULL, "color" text NOT NULL, "table_fipe" boolean NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "cover_image" text NOT NULL, "published" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "cpf" character varying(14) NOT NULL, "phone" bigint NOT NULL, "birth_date" date NOT NULL, "description" text NOT NULL, "password" text NOT NULL, "type_user" text NOT NULL, "reset_token" character varying, "addressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "advertId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_a5c4bcc83d2e880671026235f7d" FOREIGN KEY ("advertsId") REFERENCES "adverts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "adverts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_a5c4bcc83d2e880671026235f7d"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "adverts"`);
        await queryRunner.query(`DROP TABLE "image_gallery"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
