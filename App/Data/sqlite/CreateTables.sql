-- SQLite

-- Table "user"
DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user" (
  "id" INTEGER PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  UNIQUE ("id")
);

-- Table "account"
DROP TABLE IF EXISTS "account";
CREATE TABLE IF NOT EXISTS "account" (
  "id" INTEGER PRIMARY KEY,
  "email" TEXT NOT NULL,
  "pseudo" TEXT NOT NULL,
  "hash" TEXT NOT NULL,
  "salt" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

-- Table "session"
DROP TABLE IF EXISTS "session";
CREATE TABLE IF NOT EXISTS "session" (
  "id" INTEGER PRIMARY KEY,
  "token" TEXT NOT NULL,
  "creationDate" INTEGER NOT NULL,
  "account_id" INTEGER NOT NULL,
  FOREIGN KEY ("account_id") REFERENCES "account" ("id")
);

-- Table "pixel"
DROP TABLE IF EXISTS "pixel";
CREATE TABLE IF NOT EXISTS "pixel" (
  "xCoordinate" INTEGER,
  "yCoordinate" INTEGER,
  "pixelColor" TEXT,
  "targetUser" INTEGER,
  PRIMARY KEY ("xCoordinate", "yCoordinate")
);

-- Insertion of one User
INSERT INTO user VALUES (1,"mattéo", "badet");
INSERT INTO account VALUES (1, 'm.badet@ymag.fr', "Matt", "#######", 321, 1);