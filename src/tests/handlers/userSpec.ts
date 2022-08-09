import supertest from 'supertest';
import app from '../../..';
const request = supertest(app);

describe('User Route', (): void => {
  it('should return all users', async (): Promise<void> => {
    const response = await request.get('/users').set({
      authorization: process.env.TEST_TOKEN
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add a user to the database and return a JWT token', async (): Promise<void> => {
    const user = {
      firstName: 'FirstName',
      lastName: 'LastName',
      password: 'Password'
    };
    const response = await request
      .post('/users/sign-up')
      .set({
        authorization: process.env.TEST_TOKEN
      })
      .send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return a user', async (): Promise<void> => {
    const response = await request.get('/users/1').set({
      authorization: process.env.TEST_TOKEN
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return a JWT token', async (): Promise<void> => {
    const user = {
      firstName: 'FirstName',
      lastName: 'LastName',
      password: 'Password'
    };

    const response = await request.post('/users/sign-in').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return a 404 if the user is not found', async (): Promise<void> => {
    const response = await request.get('/users/100').set({
      authorization: process.env.TEST_TOKEN
    });
    expect(response.status).toBe(404);
  });
});
