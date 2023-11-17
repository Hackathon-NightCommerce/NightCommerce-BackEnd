import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteractionFieldConfirmedTableUsers1700153276903 implements MigrationInterface {
    name = 'AlteractionFieldConfirmedTableUsers1700153276903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "confirmed" DROP DEFAULT`);
    }

}
