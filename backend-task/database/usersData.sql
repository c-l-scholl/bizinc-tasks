DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id              VARCHAR(80)    NOT NULL,
    user_firstName       VARCHAR(32)    NOT NULL,
    user_lastName        VARCHAR(32)    NOT NULL,
    user_email           VARCHAR(320)   NOT NULL,
    user_password        VARCHAR(64)    NOT NULL,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password)
    VALUES ('1345234532542', 'Camden', 'Scholl', 'camden@scholl.com', 'q84y0q8q234yahsdh');

INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password)
    VALUES ('2324523642', 'Cotton Eye', 'Joe', 'cottoneye@joe.com', 'ay8s7443ahwuhdufha');

INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password)
    VALUES ('32345324', 'Tim', 'Apple', 'tim@apple.com', 'asodhfasoeypy8y3528y2');

INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password)
    VALUES ('43463246', 'Billy', 'Beane', 'billy@beane.com', 'aosdhfas08a85ypa8y');
