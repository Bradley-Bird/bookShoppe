const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('displays a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(5);
  });
  it('displays book by id, with author', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      authors: expect.arrayContaining([
        {
          id: expect.any(Number),
          first_name: expect.any(String),
          last_name: expect.any(String),
          birth_date: expect.any(String),
        },
      ]),
    });
  });
  it('should add a new author', async () => {
    const res = await request(app).post('/books').send({
      title: 'Hitchhikers Guide to the Galaxy',
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Hitchhikers Guide to the Galaxy');
  });
  afterAll(() => {
    pool.end();
  });
});
