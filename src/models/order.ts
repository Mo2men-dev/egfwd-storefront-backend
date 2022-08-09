import client from '../database/database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderedProduct = {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
};

export type NewOrder = {
  order: Order;
  product: OrderedProduct;
};

export class OrderStore {
  async userOrders(userId: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query =
        'SELECT status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id = $1';
      const result = await connection.query(query, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get orders ${error}`);
    }
  }

  async create(newOrder: NewOrder): Promise<OrderedProduct> {
    try {
      const { order, product } = newOrder;
      const connection = await client.connect();
      const query =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(query, [
        order.user_id,
        order.status
      ]);
      const orderId = result.rows[0].id;
      const query2 =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result2 = await connection.query(query2, [
        orderId,
        product.product_id,
        product.quantity
      ]);
      connection.release();
      return result2.rows[0];
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
