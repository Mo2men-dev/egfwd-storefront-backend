import client from '../database/database';
import supertest from 'supertest';
import app from '../../';
const request = supertest(app);

export const databaseBeforeAll = async (): Promise<void> => {
  const user = {
    firstName: 'testUser1',
    lastName: 'testUserLast1',
    password: 'testUserPass1'
  };

  await request.post('/users/sign-up').send(user);
  const query =
    "INSERT INTO products (name,price,category) VALUES ('Appels', 20, 'fruits'),('Oranges', 15, 'fruits'),('Tea', 20, 'hot-drinks'); INSERT INTO orders (user_id,status) VALUES (1,'active'),(1,'complete'); INSERT INTO order_products (order_id,product_id,quantity) VALUES (1,1,5),(2,3,3);";
  const connection = await client.connect();
  await connection.query(query);
  connection.release();
};

export const databaseAfterAll = async (): Promise<void> => {
  const query =
    'TRUNCATE TABLE users, products, orders, order_products RESTART IDENTITY;';
  const connection = await client.connect();
  await connection.query(query);
  connection.release();
};
