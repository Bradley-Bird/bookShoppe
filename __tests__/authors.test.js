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
  afterAll(() => {
    pool.end();
  });
});
