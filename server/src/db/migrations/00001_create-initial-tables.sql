CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.users
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email text COLLATE pg_catalog."default" NOT NULL,
  password text COLLATE pg_catalog."default" NOT NULL,

  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email)
)
WITH (
  OIDS = FALSE
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx
  ON public.users USING btree
  (email COLLATE pg_catalog."default")
  TABLESPACE pg_default;
