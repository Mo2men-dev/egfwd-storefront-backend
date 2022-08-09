import client from '../database/database';

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async userOrders(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM orders WHERE user_id = $1';
      const result = await connection.query(query, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get orders ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const query =
        'INSERT INTO orders (product_id,quantity,user_id,status) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(query, [
        order.product_id,
        order.quantity,
        order.user_id,
        order.status
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create order ${error}`);
    }
  }

  async completeOrdersByUser(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
      const result = await connection.query(query, [userId, 'complete']);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get orders ${error}`);
    }
  }
}
