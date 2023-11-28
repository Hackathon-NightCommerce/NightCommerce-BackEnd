import { MigrationInterface, QueryRunner } from "typeorm";

export class AsEnum1700701130958 implements MigrationInterface {
    name = 'AsEnum1700701130958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "category"`);
        await queryRunner.query(`CREATE TYPE "public"."adverts_category_enum" AS ENUM('Informatica', 'Notekook', 'Impressoras', 'SmartPhones', 'Domestico', 'Tvs', 'Outros')`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "category" "public"."adverts_category_enum" NOT NULL DEFAULT 'Outros'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."adverts_category_enum"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "category" text NOT NULL`);
    }

}
