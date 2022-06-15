const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('displays a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(2);
  });
  it('displays author by id, with books', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      birth_date: expect.any(String),

      books: expect.arrayContaining([
        {
          id: expect.any(Number),
          title: expect.any(String),
        },
      ]),
    });
  });
  it('should add a new author', async () => {
    const res = await request(app).post('/authors').send({
      first_name: 'Frank',
      last_name: 'Herbert',
      birth_date: '1920-10-08',
    });
    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe('Frank');
    expect(res.body.last_name).toBe('Herbert');
    expect(res.body.birth_date).toBeDefined();
  });

  afterAll(() => {
    pool.end();
  });
});
