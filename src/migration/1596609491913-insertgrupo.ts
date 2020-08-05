import {MigrationInterface, QueryRunner} from "typeorm";

export class insertgrupo1596609491913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO "grupo" ("nome") VALUES ('grupo 1')`
        );

        await queryRunner.query(
          `INSERT INTO "grupo" ("nome") VALUES ('grupo 2')`
        );

        await queryRunner.query(
          `INSERT INTO "grupo" ("nome") VALUES ('grupo 3')`
        );

        await queryRunner.query(
          `INSERT INTO "grupo" ("nome") VALUES ('grupo 4')`
        );

        await queryRunner.query(
          `INSERT INTO "grupo" ("nome") VALUES ('grupo 5')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
