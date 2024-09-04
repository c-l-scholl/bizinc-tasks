## Getting Started

To install the necessary dependencies, run 

```bash
npm install
```

## Running the SQL script

Once you are connected to a PostgreSQL database through psql, run:

```bash 
\i social-media-schema.sql
```

This will create all of the necessary tables: users_table, posts, and comments. The script will also insert sample data into the tables. Then, run:

```bash
\i social-media-queries.sql
```

This will perform the two desired queries:
1. Get posts from a specific user
2. Get the number of comments from a specific post

To quit, use:

```bash
\q
```

The values for the specfic user and specific post are currently hardcorded in, and should be updated to variables if the schema is used for a larger project.

## Explanation

### Schema

To properly store the data, I created 3 tables: users_table, posts, and comments. Instead of using the common keyword of "user" or "users", I decided on users_table to prevent any collisions. 

#### Tables 

The users_table contains 4 columns :
1. user_id: An auto-incrementing integer serving as the primary key
2. username: The user's username, with a limit of 32 characters
3. user_password: The user's password, which is intended to be stored as a hash, with a 64 character limit to match modern hashing algorithms like sha-256.
4. user_created_at: The timestamp that the user was created at

The posts table has 5 columns:
1. post_id: An auto-incrementing integer serving as the primary key
2. user_id: A foreign key representing the user who created the post
3. post_title: The title of the post, limited to 50 characters to ease future formatting concerns
4. post_content: The content of the post, limited to 250 characters like some popular social media platforms
5. post_created_at: The timestamp that the post was created at

The comments table has 5 columns:
1. comment_id: An auto-incrementing integer serving as the primary key
2. user_id: A foreign key representing the user who created the comment
3. post_id: A foreign key representing the post on which the comment was made
4. comment_content: The content of the comment, limited to 100 characters to ease future formatting concerns.
5. comment_created_at: The timestamp that the comment was created at

#### Relationships
The relationship between each table is one-many:

__users_table to posts__:
Each user can have 0 or more posts

__posts to comments__:
Each post can have 0 or more comments

__users_table to comments__: 
Each user can have 0 or more comments

### Queries

The two desired queries are 
1. Get posts from a specific user
2. Get the number of comments from a specific post

#### Query 1
To get the posts from a specific user, we match join the users_table to the posts table. The resulting table will look something like this:

| post_id | user_id | post_title 	| post_content 	| post_created_at	|
| ---			| ---			| ---					| --- 					| ---							|
|1				|	1				|	title1			| content1			| then						|
|2				| 1				| title2			| content2			| now							|

From here, we can filter by a specific user_id to get all the posts by a specific user.

#### Query 2

To get the number of comments from a specific post, we want to get the post_id, post_title (for readability), and use the COUNT() function to count comment_id, as well as rename the result to comment_count for readability.
Then, we left outer join the comments table with the posts table, which results in:

| post_id | post_title 	| comment_id 	|
| ---			| ---					| ---					| 
|1				|	title1			|	1						| 
|1				| title1			| 2						| 
|2				| title2			| NULL				|

Using a left outer join means that we will get all posts in the result, even if they have zero comments. 

Then, we filter by a specific post_id and group by the relevant information (post_id and post_title) to ensure that the COUNT() function displays a meaningful result.
