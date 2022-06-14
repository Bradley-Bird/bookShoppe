const pool = require('../utils/pool');

class Book {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map(Book.constructor());
  }
}

module.exports = Book;
