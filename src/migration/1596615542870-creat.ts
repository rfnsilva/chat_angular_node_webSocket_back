import {MigrationInterface, QueryRunner} from "typeorm";

export class creat1596615542870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "email" character varying(100) NOT NULL,
          "password" character varying(100) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefnn11b5a2fa29s96828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
          `CREATE TABLE "mensagem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "autor" character varying(100) NOT NULL,
          "mensagem" character varying(500) NOT NULL,
          "userId" uuid,
          CONSTRAINT "REL_0b343f6b8ca70f5ee3d9fqb956" ("userId"),
          "grupoId" uuid,
          CONSTRAINT "REL_0b349f6b8ca70f5eed39ffb956" ("grupoId"),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefbb11b5a2fa29s96828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
          `CREATE TABLE "grupo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefbg11b5a2sa29s96828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
            `CREATE TABLE "grupo_user_user" ("grupoId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_3ef0759852caaefb9bac7cf913e" PRIMARY KEY ("grupoId", "userId"))`,
        );

        await queryRunner.query(
          `CREATE INDEX "IDX_ccb4ae4609bfbf4d022560a3f8" ON "grupo_user_user" ("grupoId") `,
        );
        await queryRunner.query(
          `CREATE INDEX "IDX_9a616bdfff1c46bddeb8ad78db" ON "grupo_user_user" ("userId") `,
        );

        await queryRunner.query(
            `ALTER TABLE "mensagem" ADD CONSTRAINT "FK_2652456e912c983cde73d3281db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "mensagem" ADD CONSTRAINT "FK_2652443e9129c83cde72dg281db" FOREIGN KEY ("grupoId") REFERENCES "grupo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );




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
