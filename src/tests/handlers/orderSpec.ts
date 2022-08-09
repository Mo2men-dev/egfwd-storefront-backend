import { Order } from '../../models/order';
import supertest from 'supertest';
import app from '../../..';
import { databaseBeforeAll } from '../DatabaseHandler';

const request = supertest(app);

describe('Order Route', (): void => {
  it('should return all orders for a user', async (): Promise<void> => {
    const response = await request.get('/orders/1').set({
      authorization: process.env.TEST_TOKEN
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add an order to the database and return it', async (): Promise<void> => {
    const order: Order = {
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: 'active'
    };
    const response = await request
      .post('/orders/add')
      .set({
        authorization: process.env.TEST_TOKEN
      })
      .send(order);

    expect(response.status).toBe(201);
    expect(response.body.product_id).toBe(1);
  });

  it('should return an array of complete orders based on the user id', async (): Promise<void> => {
    const response = await request.get('/orders/complete/1').set({
      authorization: process.env.TEST_TOKEN
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

beforeAll(async (): Promise<void> => {
  await databaseBeforeAll();
});
