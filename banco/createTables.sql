CREATE TYPE "evaluation_criterion_type" AS ENUM (
  'research_alignment',
  'innovation_potential',
  'cultural_fit',
  'relevant_experience'
);

CREATE TABLE "companies" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(255) NOT NULL,
  "embedding" "VECTOR(1536)"
);

CREATE TABLE "amostra_pesquisadores" (
  "id_pesquisador" char(36) PRIMARY KEY,
  "nome_pesquisador" varchar(255),
  "primeiro_nome" varchar(100),
  "nome_meio" varchar(100),
  "sobrenome" varchar(100),
  "departamento" varchar(255),
  "universidade" varchar(255),
  "pais" varchar(100)
);

CREATE TABLE "embedding_curriculos" (
  "id_pesquisador" char(36) NOT NULL,
  "abstract_embeddings" "VECTOR(1536)",
  "articles_embeddings" "VECTOR(1536)",
  "project_name_embeddings" "VECTOR(1536)",
  "description_project_embeddings" "VECTOR(1536)",
  "great_area_embeddings" "VECTOR(1536)",
  "area_specialty_embeddings" "VECTOR(1536)",
  "patent_embeddings" "VECTOR(1536)",
  "book_chapter_embeddings" "VECTOR(1536)",
  "event_name_embeddings" "VECTOR(1536)",
  "created_at" timestamptz,
  "updated_in" timestamptz,
  PRIMARY KEY ("id_pesquisador")
);

CREATE TABLE "company_recommendations_for_researchers" (
  "researcher_id" char(36) NOT NULL,
  "company_id" uuid NOT NULL,
  "area" varchar(255),
  "recommendation_reason" text,
  PRIMARY KEY ("researcher_id", "company_id")
);

CREATE TABLE "researcher_evaluations_by_company" (
  "researcher_id" char(36) NOT NULL,
  "company_id" uuid NOT NULL,
  "criterion_name" evaluation_criterion_type NOT NULL,
  "criterion_value" real NOT NULL,
  "criterion_text" text,
  PRIMARY KEY ("researcher_id", "company_id", "criterion_name")
);

COMMENT ON COLUMN "companies"."embedding" IS 'Requires the pgvector extension in PostgreSQL';

COMMENT ON COLUMN "amostra_pesquisadores"."id_pesquisador" IS 'Primary key from the sample file';

COMMENT ON COLUMN "embedding_curriculos"."id_pesquisador" IS 'References amostra_pesquisadores.id_pesquisador';

COMMENT ON COLUMN "company_recommendations_for_researchers"."researcher_id" IS 'Matches the type of amostra_pesquisadores.id_pesquisador';

COMMENT ON COLUMN "researcher_evaluations_by_company"."researcher_id" IS 'Matches the type of amostra_pesquisadores.id_pesquisador';

COMMENT ON COLUMN "researcher_evaluations_by_company"."criterion_value" IS 'Value must be between 0.0 and 1.0';

ALTER TABLE "company_recommendations_for_researchers" ADD FOREIGN KEY ("researcher_id") REFERENCES "amostra_pesquisadores" ("id_pesquisador") ON DELETE CASCADE;

ALTER TABLE "researcher_evaluations_by_company" ADD FOREIGN KEY ("researcher_id") REFERENCES "amostra_pesquisadores" ("id_pesquisador") ON DELETE CASCADE;

ALTER TABLE "embedding_curriculos" ADD FOREIGN KEY ("id_pesquisador") REFERENCES "amostra_pesquisadores" ("id_pesquisador") ON DELETE CASCADE;

ALTER TABLE "company_recommendations_for_researchers" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE;

ALTER TABLE "researcher_evaluations_by_company" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE;
