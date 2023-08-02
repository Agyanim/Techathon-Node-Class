DROP TABLE IF EXISTS user_tbl ;
DROP TABLE IF EXISTS note_tbl;

CREATE TABLE user_tbl(
    user_id UUID NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255)NOT NULL,
    email VARCHAR(100)NOT NULL UNIQUE,
    password VARCHAR(255)NOT NULL,
    created_on Date,
    modified_on Date
)

CREATE TABLE note_tbl(
    note_id UUID NOT NULL PRIMARY KEY,
    title VARCHAR(255) ,
    note  TEXT NOT NULL,
    user_id UUID REFERENCES user_tbl(user_id) NOT NULL
)
