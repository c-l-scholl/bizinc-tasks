@ -0,0 +1,95 @@
-- Drop tables in reverse creation order to prevent foreign key conflicts

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users_table;

-- Create user table (avoid common name user)
CREATE TABLE users_table (
	user_id				SERIAL PRIMARY KEY,
	username			VARCHAR(32),
	user_password		VARCHAR(80),
	user_created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert users
INSERT INTO users_table (username, user_password)
	VALUES ('camdenscholl', 'a;osdhf;oashdfads');

INSERT INTO users_table (username, user_password)
	VALUES ('user2', 'aasdfasd');

INSERT INTO users_table (username, user_password)
	VALUES ('user3', 'aspofash do;fh a');

-- Create post table
CREATE TABLE posts (
	post_id 			SERIAL PRIMARY KEY,
	user_id				INTEGER NOT NULL,
	post_title			VARCHAR(50),
	post_content		VARCHAR(250),
	post_created_at		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users_table(user_id)
);

-- Insert posts
INSERT INTO posts (user_id, post_title, post_content)
	VALUES (1, 'thinking about cheese', 'cheese is pretty tasty if I do say so myself');

INSERT INTO posts (user_id, post_title, post_content)
	VALUES (2, 'what is a dog', 'i am probably a robot');

-- Create comment table
CREATE TABLE comments (
	comment_id			SERIAL PRIMARY KEY,
	user_id				INTEGER NOT NULL, 
	post_id				INTEGER NOT NULL,
	comment_content		VARCHAR(100),
	comment_created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users_table(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Insert comments
INSERT INTO comments (user_id, post_id, comment_content)
	VALUES (2, 1, 'first');

INSERT INTO comments (user_id, post_id, comment_content)
	VALUES (3, 1, 'second');

INSERT INTO comments (user_id, post_id, comment_content)
	VALUES (1, 1, 'what was I thinking about?');

--------------- QUERIES ---------------

-- Get posts by a specific user

SELECT 
	p.post_id, 
	p.post_title, 
	p.post_content, 
	p.post_created_at
FROM 
	posts p 
INNER JOIN 
	users_table u 
ON 
	p.user_id = u.user_id
WHERE 
	u.username = 'camdenscholl'; 

-- Get comment count on a specific post

SELECT 
	p.post_id, 
	p.post_title, 
	COUNT(c.comment_id) AS comment_count
FROM 
	posts p
LEFT JOIN 
	comments c ON c.post_id = p.post_id
WHERE 
	p.post_id = 1
GROUP BY 
	p.post_id, 
	p.post_title;