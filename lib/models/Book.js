const pool = require('../utils/pool');

class Book {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.authors = row.authors && row.authors;
  }

  static async insert({ title }) {
    const { rows } = await pool.query(
      `
    INSERT INTO books (title) VALUES ($1) RETURNING *`,
      [title]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
        COALESCE(json_agg(to_jsonb(authors)) 
        FILTER (WHERE authors.id is not null), '[]') 
        as authors
        FROM books
        LEFT JOIN authors_books on books.id = authors_books.book_id
        LEFT JOIN authors on authors_books.author_id = authors.id
        WHERE books.id =$1
        GROUP BY books.id;`,
      [id]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;
