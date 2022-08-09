import client from '../database/database';

export const databaseBeforeAll = async (): Promise<void> => {
  const query =
    "INSERT INTO users (firstName,lastName,password) VALUES ('user1', 'user1last', 'password1');INSERT INTO products (name,price,category) VALUES ('Appels', 20, 'fruits');";
  const connection = await client.connect();
  await connection.query(query);
  connection.release();
};

export const databaseAfterAll = async (): Promise<void> => {
  const query = 'TRUNCATE TABLE users, products, orders RESTART IDENTITY;';
  const connection = await client.connect();
  await connection.query(query);
  connection.release();
};
