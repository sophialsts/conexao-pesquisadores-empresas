CREATE TYPE "evaluation_criterion_type" AS ENUM (
  'areaEstudo',
  'flexibilidade',
  'experienciaAcademica'
);

CREATE TABLE "companies" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(255) NOT NULL UNIQUE,
  "embedding" VECTOR(1536),
  "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "company_recommendations_for_researchers" (
  "researcher_id" uuid NOT NULL,
  "company_id" uuid NOT NULL,
  "company_name" varchar(255),
  "area" varchar(255),
  "recommendation_reason" text,
  "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("researcher_id", "company_id")
);

CREATE TABLE "researcher_evaluations_by_company" (
  "researcher_id" uuid NOT NULL,
  "company_id" uuid NOT NULL,
  "criterion_name" evaluation_criterion_type NOT NULL,
  "criterion_value" real NOT NULL,
  "recommendation_reason" text,
  "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("researcher_id", "company_id", "criterion_name")
);

COMMENT ON COLUMN "companies"."embedding" IS 'Requires the pgvector extension in PostgreSQL';

COMMENT ON COLUMN "researcher_evaluations_by_company"."criterion_value" IS 'Value must be between 0.0 and 1.0';

ALTER TABLE "company_recommendations_for_researchers" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE;

ALTER TABLE "researcher_evaluations_by_company" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE;

ALTER TABLE "researcher_evaluations_by_company" ADD CONSTRAINT "check_criterion_value_range"  CHECK ("criterion_value" >= 0.0 AND "criterion_value" <= 1.0);
