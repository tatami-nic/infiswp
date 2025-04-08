invalid tweets
SELECT tweet_id FROM tweets
WHERE LENGTH(CONTENT)>15;