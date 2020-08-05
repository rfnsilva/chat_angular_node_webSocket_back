"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertgrupo1596609491913 = void 0;

class insertgrupo1596609491913 {
  async up(queryRunner) {
    await queryRunner.query(`INSERT INTO "grupo" ("nome") VALUES ('grupo 1')`);
    await queryRunner.query(`INSERT INTO "grupo" ("nome") VALUES ('grupo 2')`);
    await queryRunner.query(`INSERT INTO "grupo" ("nome") VALUES ('grupo 3')`);
    await queryRunner.query(`INSERT INTO "grupo" ("nome") VALUES ('grupo 4')`);
    await queryRunner.query(`INSERT INTO "grupo" ("nome") VALUES ('grupo 5')`);
  }

  async down(queryRunner) {}

}

exports.insertgrupo1596609491913 = insertgrupo1596609491913;