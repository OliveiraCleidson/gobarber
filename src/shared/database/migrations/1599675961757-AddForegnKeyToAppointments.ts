/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForegnKeyToAppointments1599675961757
  implements MigrationInterface {
  name = 'AddForegnKeyToAppointments1599675961757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "provider"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "providerId" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2428e01f899c4edb909e8798b63" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2428e01f899c4edb909e8798b63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "providerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "updateAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "createAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "provider" character varying NOT NULL`,
    );
  }
}
