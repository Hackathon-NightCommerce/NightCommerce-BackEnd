import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableItemsCartAddNullabletrue1700070150706 implements MigrationInterface {
    name = 'AlterTableItemsCartAddNullabletrue1700070150706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_cart" ALTER COLUMN "qtd" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_cart" ALTER COLUMN "price" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_cart" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_cart" ALTER COLUMN "qtd" SET NOT NULL`);
    }

}
