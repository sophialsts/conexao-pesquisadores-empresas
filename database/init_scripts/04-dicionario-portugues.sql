CREATE TEXT SEARCH CONFIGURATION public.portuguese_unaccent ( COPY = pg_catalog.portuguese );

ALTER TEXT SEARCH CONFIGURATION public.portuguese_unaccent
    ALTER MAPPING FOR hword, hword_part, word
    WITH unaccent, portuguese_stem;
