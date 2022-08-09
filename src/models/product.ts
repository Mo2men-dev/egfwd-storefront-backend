import client from '../database/database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get products ${error}`);
    }
  }

  async show(productId: number): Promise<Product | null> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products WHERE id = $1';
      const result = await connection.query(query, [productId]);
      connection.release();
      if (result.rows.length === 0) {
        return null;
      }
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(`Couldn't get product ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const query =
        'INSERT INTO products (name,price,category) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(query, [
        product.name,
        product.price,
        product.category
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create product ${error}`);
    }
  }

  async getTopFive(): Promise<Product[] | null> {
    try {
      const connection = await client.connect();
      const query =
        'SELECT products.*,SUM(quantity) AS quantity FROM products INNER JOIN orders ON products.id = orders.product_id GROUP BY products.id ORDER BY quantity DESC LIMIT 5';
      const result = await client.query(query);

      if (result.rows.length === 0) {
        return null;
      }

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get top five products ${error}`);
    }
  }

  async listByCategory(category: string): Promise<Product[] | null> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products WHERE category = $1';
      const result = await connection.query(query, [category]);
      connection.release();
      if (result.rows.length === 0) {
        return null;
      }
      const products = result.rows;
      return products;
    } catch (error) {
      throw new Error(
        `Couldn't get products of category: ${category} ERR: ${error}`
      );
    }
  }
}
