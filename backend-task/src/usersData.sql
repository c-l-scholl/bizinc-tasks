CREATE TABLE users
(
	user_id							VARCHAR(80) NOT NULL,
	user_firstName			VARCHAR(32) NOT NULL,
	user_lastName 			VARCHAR(32) NOT NULL,
	user_email					VARCHAR(40) NOT NULL,
	created_at 					TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);

INSERT INTO users (user_id, user_firstName, user_lastName, user_email)
	VALUES ("1", "Camden", "Scholl", "camden@scholl.com");

INSERT INTO users (user_id, user_firstName, user_lastName, user_email)
	VALUES ("2", "Cotton Eye", "Joe", "cottoneye@joe.com");

INSERT INTO users (user_id, user_firstName, user_lastName, user_email)
	VALUES ("3", "Tim", "Apple", "tim@apple.com");

INSERT INTO users (user_id, user_firstName, user_lastName, user_email)
	VALUES ("4", "Billy", "Beane", "billy@beane.com");