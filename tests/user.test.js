const request = require('supertest');
const app = require('../index');

describe('GET /api/users/:id', () => {
  it('should return 404 for non-existing user', async () => {
    const res = await request(app).get('/api/users/invalidid');
    expect(res.statusCode).toBe(404);
  });
});
