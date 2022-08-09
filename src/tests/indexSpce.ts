import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Main endpoint', (): void => {
  it('should return 200 OK', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
