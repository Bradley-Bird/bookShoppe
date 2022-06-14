-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors_books CASCADE;


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    first_name VARCHAR, 
    last_name VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    title VARCHAR
);

CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors(
    first_name, 
    last_name
)
VALUES
('Brandon', 'Sanderson'),
 ('Stephen', 'King')
 ;

INSERT INTO books (
    title
)
VALUES
    ('Oathbringer'), 
    ('The way of Kings'), 
    ('MistBorne'), 
    ('The Last Gunslinger'), 
    ('It.')
;
INSERT INTO authors_books ( 
    author_id, 
    book_id
)

VALUES
    (1,1), 
    (1,2),
    (1,3),
    (2,4),
    (2,5)
;