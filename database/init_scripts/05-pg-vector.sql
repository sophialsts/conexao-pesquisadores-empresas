ALTER TABLE companies ADD COLUMN tsv tsvector;

CREATE OR REPLACE FUNCTION companies_tsv_trigger() RETURNS trigger AS $$
begin
  new.tsv := to_tsvector('public.portuguese_unaccent', new.name);
  return new;
end
$$ LANGUAGE plpgsql;


CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON companies FOR EACH ROW EXECUTE PROCEDURE companies_tsv_trigger();

CREATE INDEX companies_tsv_idx ON companies USING GIN(tsv);


ALTER TABLE researchers ADD COLUMN tsv tsvector;

CREATE OR REPLACE FUNCTION researchers_tsv_trigger() RETURNS trigger AS $$
begin
  new.tsv := to_tsvector('public.portuguese_unaccent', new.name);
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate_researchers BEFORE INSERT OR UPDATE
ON researchers FOR EACH ROW EXECUTE PROCEDURE researchers_tsv_trigger();

CREATE INDEX researchers_tsv_idx ON researchers USING GIN(tsv);