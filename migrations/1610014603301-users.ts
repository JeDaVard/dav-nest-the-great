import {MigrationInterface, QueryRunner} from "typeorm";

export class users1610014603301 implements MigrationInterface {
    name = 'users1610014603301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
    }

}
