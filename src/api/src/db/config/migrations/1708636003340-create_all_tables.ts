import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1708636003340 implements MigrationInterface {
  name = 'CreateAllTables1708636003340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "topics" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "init" TIMESTAMP WITH TIME ZONE NOT NULL,
                "end" TIMESTAMP WITH TIME ZONE NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "topic_id" uuid,
                CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "cpf" character varying(11) NOT NULL,
                "name" character varying(255) NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER',
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "votes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "yes" boolean NOT NULL DEFAULT false,
                "no" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "session_id" uuid,
                "user_id" uuid,
                CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "credentials" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "REL_c68a6c53e95a7dc357f4ebce8f" UNIQUE ("user_id"),
                CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "sessions"
            ADD CONSTRAINT "FK_53be18ac9b99162571ef4662d5b" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "votes"
            ADD CONSTRAINT "FK_1b5640a9b80475a2e17a70ff2a2" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "votes"
            ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "credentials"
            ADD CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "credentials" DROP CONSTRAINT "FK_c68a6c53e95a7dc357f4ebce8f0"
        `);
    await queryRunner.query(`
            ALTER TABLE "votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"
        `);
    await queryRunner.query(`
            ALTER TABLE "votes" DROP CONSTRAINT "FK_1b5640a9b80475a2e17a70ff2a2"
        `);
    await queryRunner.query(`
            ALTER TABLE "sessions" DROP CONSTRAINT "FK_53be18ac9b99162571ef4662d5b"
        `);
    await queryRunner.query(`
            DROP TABLE "credentials"
        `);
    await queryRunner.query(`
            DROP TABLE "votes"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "sessions"
        `);
    await queryRunner.query(`
            DROP TABLE "topics"
        `);
  }
}
