DROP SCHEMA IF EXISTS greenCheck;
CREATE SCHEMA IF NOT EXISTS greenCheck DEFAULT CHARACTER SET utf8;
USE greenCheck;

-- -------------------------------------------

DROP TABLE IF EXISTS greenCheck.user;

CREATE TABLE IF NOT EXISTS greenCheck.user (
	Id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    image VARCHAR(200),
    fine VARCHAR(10),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);

DROP TABLE IF EXISTS greenCheck.commits;

CREATE TABLE IF NOT EXISTS greenCheck.commits (
    Id VARCHAR(20) NOT NULL,
    repo VARCHAR(30),
    created VARCHAR(50),
    checked DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);

-- -------------------------------------------
