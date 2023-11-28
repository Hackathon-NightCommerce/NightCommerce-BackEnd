import { MigrationInterface, QueryRunner } from "typeorm";

export class AsnewEnum1701109811470 implements MigrationInterface {
    name = 'AsnewEnum1701109811470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."adverts_category_enum" RENAME TO "adverts_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."adverts_category_enum" AS ENUM('Eletrônicos', 'Moda e Vestuário', 'Casa e Cozinha', 'Livros e Mídia', 'Beleza e Cuidados Pessoais', 'Esportes e Lazer', 'Brinquedos e Jogos', 'Saúde e Bem-Estar', 'Automotivo', 'Alimentos e Bebidas', 'Móveis e Decoração', 'outros')`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" TYPE "public"."adverts_category_enum" USING "category"::"text"::"public"."adverts_category_enum"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" SET DEFAULT 'outros'`);
        await queryRunner.query(`DROP TYPE "public"."adverts_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."adverts_category_enum_old" AS ENUM('Informatica', 'Notebook', 'Impressoras', 'SmartPhones', 'Domestico', 'Tvs', 'Outros')`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" TYPE "public"."adverts_category_enum_old" USING "category"::"text"::"public"."adverts_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" SET DEFAULT 'Outros'`);
        await queryRunner.query(`DROP TYPE "public"."adverts_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."adverts_category_enum_old" RENAME TO "adverts_category_enum"`);
    }

}
