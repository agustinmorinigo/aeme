create table public."testing_ci_cd" (
  id integer primary key generated always as identity,
  name text,
  last_name text
);