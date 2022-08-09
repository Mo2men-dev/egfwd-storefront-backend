import client from '../database/database';
import { hashSync, compareSync } from 'bcrypt';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM users';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get users ${error}`);
    }
  }

  async show(userId: number): Promise<User | null> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await connection.query(query, [userId]);
      connection.release();
      if (result.rows.length === 0) {
        return null;
      }
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Couldn't get user ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const query =
        'INSERT INTO users (firstName,lastName,password) VALUES ($1, $2, $3) RETURNING *';
      const hash = hashSync(
        user.password + process.env.SALT,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await connection.query(query, [
        user.firstName,
        user.lastName,
        hash
      ]);
      connection.release();
      const newUser = result.rows[0];
      return newUser;
    } catch (error) {
      throw new Error(`Couldn't create user ${error}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM users WHERE firstName = $1';
      const result = await connection.query(query, [user.firstName]);
      connection.release();
      if (result.rows.length === 0) {
        throw new Error(`User not found`);
      }
      const authenticate = compareSync(
        user.password + process.env.SALT,
        result.rows[0].password
      );
      if (!authenticate) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't authenticate user ${error}`);
    }
  }
}
