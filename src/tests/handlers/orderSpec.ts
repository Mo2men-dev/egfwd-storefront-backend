import supertest from 'supertest';
import app from '../../..';
import { databaseBeforeAll } from '../DatabaseHandler';

const request = supertest(app);

describe('Order Route', (): void => {
  it('should return all orders for a user', async (): Promise<void> => {
    const user = {
      firstName: 'testUser1',
      lastName: 'testUserLast1',
      password: 'testUserPass1'
    };

    const token = await request.post('/users/sign-in').send(user);
    console.log('*****test token*****', token.body);
    const response = await request.get('/orders/user/1').set({
      authorization: token.body.token
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add an order to the database and return it', async (): Promise<void> => {
    const order = {
      user_id: 1,
      status: 'active',
      product_id: 1,
      quantity: 1
    };
    const user = {
      firstName: 'testUser1',
      lastName: 'testUserLast1',
      password: 'testUserPass1'
    };

    const token = await request.post('/users/sign-in').send(user);
    const response = await request
      .post('/orders/add')
      .set({
        authorization: token.body.token
      })
      .send(order);

    expect(response.status).toBe(201);
    expect(response.body.product_id).toBe(1);
  });

  it('should return an array of complete orders based on the user id', async (): Promise<void> => {
    const user = {
      firstName: 'testUser1',
      lastName: 'testUserLast1',
      password: 'testUserPass1'
    };

    const token = await request.post('/users/sign-in').send(user);
    const response = await request.get('/orders/complete/user/1').set({
      authorization: token.body.token
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

beforeAll(async (): Promise<void> => {
  await databaseBeforeAll();
});
