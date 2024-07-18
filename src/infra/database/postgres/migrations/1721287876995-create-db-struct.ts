import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDbStruct1721287876995 implements MigrationInterface {
  name = 'CreateDbStruct1721287876995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying NOT NULL, 
        "secret_string" character varying, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_463ae1d487e2b708a21c2b4df09" 
          UNIQUE ("title"), 
        CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "companies_services_access" (
        "company_id" uuid NOT NULL, 
        "service_id" uuid NOT NULL, 
        "access" boolean NOT NULL DEFAULT false, 
        "expired_at" TIMESTAMP WITH TIME ZONE NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_71fcf53e2cd989ca5e77764344e" 
          PRIMARY KEY ("company_id", "service_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "services" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "owner_company_id" uuid NOT NULL, 
        CONSTRAINT "UQ_c4c2cae2c7d2584fedf60a787d3" 
          UNIQUE ("title"), 
        CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying NOT NULL, 
        "access_link" character varying, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "service_id" uuid NOT NULL, 
        CONSTRAINT "PK_920331560282b8bd21bb02290df" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_08e86fada7ae67b1689f948e83e" 
          UNIQUE ("title"), 
        CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_permissions" (
        "role_id" uuid NOT NULL, 
        "permission_id" uuid NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8e2dfbe3f527139c1126fb464ee" 
          PRIMARY KEY ("role_id", "permission_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "email" character varying NOT NULL, 
        "firstname" character varying NOT NULL, 
        "lastname" character varying NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "company_id" uuid, 
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" 
          UNIQUE ("email"), 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles" (
        "user_id" uuid NOT NULL, 
        "role_id" uuid NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_55df5eb63e937fa8e0063e951e6" 
          PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "passwords" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "password_hash" character varying NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "user_id" uuid, 
        CONSTRAINT "PK_c5629066962a085dea3b605e49f" 
          PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_services_access" 
        ADD CONSTRAINT "FK_aee41075f1785b906e01f05a942" 
        FOREIGN KEY ("company_id") 
        REFERENCES "companies"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_services_access" 
        ADD CONSTRAINT "FK_5272dc2c60a60d062aafd0721aa" 
        FOREIGN KEY ("service_id") 
        REFERENCES "services"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" 
        ADD CONSTRAINT "FK_5258a8582ecf6ce0eb56a5b096a" 
        FOREIGN KEY ("owner_company_id") 
        REFERENCES "companies"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" 
        ADD CONSTRAINT "FK_19d151ac4c624509d0e7bb73cfa" 
        FOREIGN KEY ("service_id") 
        REFERENCES "services"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" 
        ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" 
        FOREIGN KEY ("role_id") 
        REFERENCES "roles"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" 
        ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" 
        FOREIGN KEY ("permission_id") 
        REFERENCES "permissions"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" 
        ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" 
        FOREIGN KEY ("company_id") 
        REFERENCES "companies"("id") 
          ON DELETE SET NULL 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" 
        ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" 
        ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" 
        FOREIGN KEY ("role_id") 
        REFERENCES "roles"("id") 
          ON DELETE NO ACTION 
          ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "passwords" 
        ADD CONSTRAINT "FK_72ee375de524a1d87396f4f2a02" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "passwords" DROP CONSTRAINT "FK_72ee375de524a1d87396f4f2a02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_19d151ac4c624509d0e7bb73cfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_5258a8582ecf6ce0eb56a5b096a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_services_access" DROP CONSTRAINT "FK_5272dc2c60a60d062aafd0721aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_services_access" DROP CONSTRAINT "FK_aee41075f1785b906e01f05a942"`,
    );
    await queryRunner.query(`DROP TABLE "passwords"`);
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles_permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "companies_services_access"`);
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
