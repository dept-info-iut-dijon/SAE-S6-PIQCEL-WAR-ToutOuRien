-- Table "user"
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL
);

-- Table "account"
DROP TABLE IF EXISTS account;
CREATE TABLE IF NOT EXISTS account (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  pseudo VARCHAR(50) NOT NULL,
  hash VARCHAR(50) NOT NULL,
  salt INT NOT NULL,
  user_id INT NOT NULL DEFAULT 0,
  account_is_valid BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Table "session"
DROP TABLE IF EXISTS session;
CREATE TABLE IF NOT EXISTS session (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(50) NOT NULL,
  creationDate INT NOT NULL,
  account_id INT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account (id)
);
