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
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((row) => new Author(row));
  }
}

module.exports = Author;
