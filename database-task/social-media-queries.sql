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