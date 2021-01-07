import {MigrationInterface, QueryRunner} from "typeorm";

export class users1610014571513 implements MigrationInterface {
    name = 'users1610014571513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`);
    }

}
