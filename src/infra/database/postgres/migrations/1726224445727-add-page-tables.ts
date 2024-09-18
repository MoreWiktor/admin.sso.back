import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPageTables1726224445727 implements MigrationInterface {
  name = 'AddPageTables1726224445727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."style_patterns_type_enum" 
        AS ENUM('button', 'field', 'form', 'background')`,
    );
    await queryRunner.query(
      `CREATE TABLE "style_patterns" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "type" "public"."style_patterns_type_enum" NOT NULL,
        "style" jsonb NOT NULL,
        "scope_company_id" uuid,
        CONSTRAINT "UQ_26d4f4c08224620afc78b36913b"
            UNIQUE NULLS NOT DISTINCT ("scope_company_id", "type", "title"),
        CONSTRAINT "PK_db57b87ee0490d00c37134154fc"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "backgrounds" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "style_pattern_id" uuid,
        CONSTRAINT "PK_a5457d0aae72f18efc3cdf6e6bb"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "forms" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying(15) NOT NULL,
        "style_pattern_id" uuid,
        CONSTRAINT "PK_ba062fd30b06814a60756f233da"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."buttons_type_enum"
        AS ENUM('submit', 'redirect')`,
    );
    await queryRunner.query(
      `CREATE TABLE "buttons" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying(15) NOT NULL,
        "position" integer NOT NULL,
        "type" "public"."buttons_type_enum" NOT NULL,
        "style_pattern_id" uuid, "page_id" uuid,
        CONSTRAINT "UQ_93130b6fb08adbacb0a6ac16670"
            UNIQUE ("page_id", "position"),
        CONSTRAINT "PK_0b55de60f80b00823be7aff0de2"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."fields_type_enum"
        AS ENUM('email', 'number', 'password', 'submit', 'tel', 'text')`,
    );
    await queryRunner.query(
      `CREATE TABLE "fields" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying(15) NOT NULL,
        "position" integer NOT NULL,
        "type" "public"."fields_type_enum" NOT NULL,
        "required" boolean NOT NULL DEFAULT true,
        "page_id" uuid,
        "style_pattern_id" uuid,
        CONSTRAINT "UQ_7f78636faec12dbd7e49dca9f48"
            UNIQUE ("page_id", "position"),
        CONSTRAINT "PK_ee7a215c6cd77a59e2cb3b59d41"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pages_type_enum"
        AS ENUM('signup')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pages" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "type" "public"."pages_type_enum" NOT NULL,
        "form_id" uuid, "background_id" uuid,
        "company_id" uuid,
        CONSTRAINT "UQ_310956e6a58708b32d6d73c563a"
            UNIQUE NULLS NOT DISTINCT ("company_id", "type"),
        CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b"
            PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "style_patterns"
        ADD CONSTRAINT "FK_e6f712e06f5713ed3f3d754a64e"
        FOREIGN KEY ("scope_company_id")
        REFERENCES "companies"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "backgrounds"
        ADD CONSTRAINT "FK_a2286264e92b5d26e45d03b8aa7"
        FOREIGN KEY ("style_pattern_id")
        REFERENCES "style_patterns"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms"
        ADD CONSTRAINT "FK_377562667938019dc6b3f0ecb96"
        FOREIGN KEY ("style_pattern_id")
        REFERENCES "style_patterns"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "buttons"
        ADD CONSTRAINT "FK_a88339ebbcf3bcce0dfe3835bcb"
        FOREIGN KEY ("style_pattern_id")
        REFERENCES "style_patterns"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "buttons"
        ADD CONSTRAINT "FK_7db28225cbcc79052d8e5b766ec"
        FOREIGN KEY ("page_id")
        REFERENCES "pages"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fields"
        ADD CONSTRAINT "FK_eebef592c0f97ab15cd7df60476"
        FOREIGN KEY ("page_id")
        REFERENCES "pages"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fields"
        ADD CONSTRAINT "FK_7db2f168560945c8e33b1966ee6"
        FOREIGN KEY ("style_pattern_id")
        REFERENCES "style_patterns"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages"
        ADD CONSTRAINT "FK_2c36ffaeb08ee87e54feceb6152"
        FOREIGN KEY ("form_id")
        REFERENCES "forms"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages"
        ADD CONSTRAINT "FK_39ab283ea734f840887d86eba8c"
        FOREIGN KEY ("background_id")
        REFERENCES "backgrounds"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages"
        ADD CONSTRAINT "FK_9e5aecc587682903817cf7a3ecf"
        FOREIGN KEY ("company_id")
        REFERENCES "companies"("id")
            ON DELETE NO ACTION
            ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pages" DROP CONSTRAINT "FK_9e5aecc587682903817cf7a3ecf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages" DROP CONSTRAINT "FK_39ab283ea734f840887d86eba8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages" DROP CONSTRAINT "FK_2c36ffaeb08ee87e54feceb6152"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fields" DROP CONSTRAINT "FK_7db2f168560945c8e33b1966ee6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fields" DROP CONSTRAINT "FK_eebef592c0f97ab15cd7df60476"`,
    );
    await queryRunner.query(
      `ALTER TABLE "buttons" DROP CONSTRAINT "FK_7db28225cbcc79052d8e5b766ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "buttons" DROP CONSTRAINT "FK_a88339ebbcf3bcce0dfe3835bcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" DROP CONSTRAINT "FK_377562667938019dc6b3f0ecb96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "backgrounds" DROP CONSTRAINT "FK_a2286264e92b5d26e45d03b8aa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "style_patterns" DROP CONSTRAINT "FK_e6f712e06f5713ed3f3d754a64e"`,
    );
    await queryRunner.query(`DROP TABLE "pages"`);
    await queryRunner.query(`DROP TYPE "public"."pages_type_enum"`);
    await queryRunner.query(`DROP TABLE "fields"`);
    await queryRunner.query(`DROP TYPE "public"."fields_type_enum"`);
    await queryRunner.query(`DROP TABLE "buttons"`);
    await queryRunner.query(`DROP TYPE "public"."buttons_type_enum"`);
    await queryRunner.query(`DROP TABLE "forms"`);
    await queryRunner.query(`DROP TABLE "backgrounds"`);
    await queryRunner.query(`DROP TABLE "style_patterns"`);
    await queryRunner.query(`DROP TYPE "public"."style_patterns_type_enum"`);
  }
}
