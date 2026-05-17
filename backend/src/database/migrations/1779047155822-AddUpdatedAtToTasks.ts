import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdatedAtToTasks1779047155822 implements MigrationInterface {
    name = 'AddUpdatedAtToTasks1779047155822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updateAt"`);
    }

}
