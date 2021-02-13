-- CreateEnum
CREATE TYPE "StatementType" AS ENUM ('PROMISE', 'INFO', 'STATEMENT');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('PERSON', 'PLACE', 'ORG', 'EVENT');

-- CreateTable
CREATE TABLE "statement_votes" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statement_entities" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statements" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "country_code" TEXT,
    "author_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "source_url" TEXT,
    "type" "StatementType" NOT NULL,
    "context" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cuont_minus_votes" INTEGER NOT NULL DEFAULT 0,
    "cuont_plus_votes" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "fullName" TEXT,
    "abbr" TEXT,
    "language_code" TEXT NOT NULL,
    "country_code" TEXT,
    "wikipedia_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statement_votes.user_id_statement_id_unique" ON "statement_votes"("user_id", "statement_id");

-- CreateIndex
CREATE INDEX "statement_votes.statement_id_index" ON "statement_votes"("statement_id");

-- CreateIndex
CREATE INDEX "statement_votes.user_id_index" ON "statement_votes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "statement_entities.entity_id_statement_id_unique" ON "statement_entities"("entity_id", "statement_id");

-- CreateIndex
CREATE INDEX "statement_entities.statement_id_index" ON "statement_entities"("statement_id");

-- CreateIndex
CREATE INDEX "statement_entities.entity_id_index" ON "statement_entities"("entity_id");

-- CreateIndex
CREATE INDEX "statements.author_id_index" ON "statements"("author_id");

-- CreateIndex
CREATE INDEX "statements.language_code_created_at_index" ON "statements"("language_code", "created_at");

-- CreateIndex
CREATE INDEX "statements.author_id_language_code_index" ON "statements"("author_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "entities.name_language_code_unique" ON "entities"("name", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "entities.slug_language_code_unique" ON "entities"("slug", "language_code");

-- CreateIndex
CREATE INDEX "entities.name_index" ON "entities"("name");

-- CreateIndex
CREATE INDEX "entities.language_code_index" ON "entities"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");

-- CreateIndex
CREATE INDEX "userId" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "providerId" ON "accounts"("provider_id");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.session_token_unique" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.access_token_unique" ON "sessions"("access_token");

-- AddForeignKey
ALTER TABLE "statement_votes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statement_votes" ADD FOREIGN KEY ("statement_id") REFERENCES "statements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statement_entities" ADD FOREIGN KEY ("entity_id") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statement_entities" ADD FOREIGN KEY ("statement_id") REFERENCES "statements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statements" ADD FOREIGN KEY ("author_id") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
