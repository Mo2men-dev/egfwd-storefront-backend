import { UserStore } from '../../models/users';
import { databaseAfterAll } from '../DatabaseHandler';

const userStore = new UserStore();

describe('User model', () => {
  describe('User model check methods', () => {
    it('should have an index methode', () => {
      expect(userStore.index).toBeDefined();
    });
    it('should have a show methode', () => {
      expect(userStore.show).toBeDefined();
    });
    it('should have a create methode', () => {
      expect(userStore.create).toBeDefined();
    });
    it('should have a authenticate methode', () => {
      expect(userStore.authenticate).toBeDefined();
    });
  });
  describe('User model method', () => {
    it('should return an array of users', async () => {
      const result = await userStore.index();
      expect(result).toBeInstanceOf(Array);
    });

    it('should return a user', async () => {
      const result = await userStore.show(1);
      expect(result).toBeInstanceOf(Object);
    });

    it('should add a user to the database and return it', async () => {
      const user = {
        firstName: 'FirstName',
        lastName: 'LastName',
        password: 'Password'
      };
      const result = await userStore.create(user);
      expect(result).toBeInstanceOf(Object);
    });

    it('should auth a user', async () => {
      const user = {
        firstName: 'FirstName',
        lastName: 'LastName',
        password: 'Password'
      };
      const result = await userStore.authenticate(user);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return null if the user is not found', async () => {
      const result = await userStore.show(100);
      expect(result).toBeNull();
    });
  });
});

afterAll(async (): Promise<void> => {
  await databaseAfterAll();
});
