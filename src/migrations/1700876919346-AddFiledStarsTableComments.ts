import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFiledStarsTableComments1700876919346 implements MigrationInterface {
    name = 'AddFiledStarsTableComments1700876919346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "stars" integer`);
        await queryRunner.query(`ALTER TYPE "public"."adverts_category_enum" RENAME TO "adverts_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."adverts_category_enum" AS ENUM('Informatica', 'Notebook', 'Impressoras', 'SmartPhones', 'Domestico', 'Tvs', 'Outros')`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" TYPE "public"."adverts_category_enum" USING "category"::"text"::"public"."adverts_category_enum"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" SET DEFAULT 'Outros'`);
        await queryRunner.query(`DROP TYPE "public"."adverts_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."adverts_category_enum_old" AS ENUM('Informatica', 'Notekook', 'Impressoras', 'SmartPhones', 'Domestico', 'Tvs', 'Outros')`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" TYPE "public"."adverts_category_enum_old" USING "category"::"text"::"public"."adverts_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "adverts" ALTER COLUMN "category" SET DEFAULT 'Outros'`);
        await queryRunner.query(`DROP TYPE "public"."adverts_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."adverts_category_enum_old" RENAME TO "adverts_category_enum"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "stars"`);
    }

}
