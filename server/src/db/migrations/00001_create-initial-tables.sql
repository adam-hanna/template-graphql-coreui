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


CREATE TABLE IF NOT EXISTS public.balance_checks
(
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  requestee_email text COLLATE pg_catalog."default" NOT NULL,
  balance numeric NOT NULL,
  pass boolean,

  CONSTRAINT balance_checks PRIMARY KEY (id),
  CONSTRAINT user_id FOREIGN KEY (user_id)
  REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)
WITH (
  OIDS = FALSE
);
