const pool = require('../utils/pool');

class Author {
  id;
  first_name;
  last_name;
  birth_date;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.birth_date = row.birth_date;
    this.books = row.books && row.books;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*, 
    COALESCE(json_agg(to_jsonb(books))
    FILTER (WHERE books.id IS NOT NULL), '[]')as books
    FROM authors
    LEFT JOIN authors_books on authors.id = authors_books.author_id
    LEFT JOIN books on authors_books.book_id = books.id
    WHERE authors.id = $1
    GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = Author;
