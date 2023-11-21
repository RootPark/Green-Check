DROP SCHEMA IF EXISTS greenCheck;
CREATE SCHEMA IF NOT EXISTS greenCheck DEFAULT CHARACTER SET utf8;
USE greenCheck;

-- -------------------------------------------

DROP TABLE IF EXISTS greenCheck.user;

CREATE TABLE IF NOT EXISTS greenCheck.user (
    name VARCHAR(20),
    image VARCHAR(200),
    fine VARCHAR(10) NOT NULL DEFAULT '0',
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(name)
);

DROP TABLE IF EXISTS greenCheck.commits;

CREATE TABLE IF NOT EXISTS greenCheck.commits (
    Id VARCHAR(20) NOT NULL,
    userName VARCHAR(20),
    repo VARCHAR(30),
    created VARCHAR(50),
    checked DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);

-- -------------------------------------------

INSERT INTO greenCheck.user(name, image) VALUES('rootPark', 'https://avatars.githubusercontent.com/u/43375122?v=4');
INSERT INTO greenCheck.commits(Id, userName, repo, created) VALUES('33214059375', 'RootPark', 'RootPark/Green-Check', '2023-11-09T07:08:25Z');