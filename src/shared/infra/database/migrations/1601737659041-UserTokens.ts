import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTokens1601737659041 implements MigrationInterface {
    name = 'UserTokens1601737659041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_token" ("id" character varying(36) NOT NULL, "token" character varying NOT NULL, "userId" character varying(36) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e03e90fb544adefa10a6c202188" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_token"`);
    }

}
