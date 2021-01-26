CREATE TABLE IF NOT EXISTS users(
  id               SERIAL PRIMARY KEY,
  firstname        VARCHAR,
  lastname         VARCHAR,
  email            VARCHAR(64) UNIQUE NULL,
  phone            VARCHAR(64),
  streetaddress    VARCHAR(64),
  city             VARCHAR(64),
  postal           VARCHAR(64),
  province         VARCHAR(64),
  amount           VARCHAR(64),
  role             INTEGER,
  dateCreated:     VARCHAR,
  password         VARCHAR(255),
  sessionid        VARCHAR(255)
);