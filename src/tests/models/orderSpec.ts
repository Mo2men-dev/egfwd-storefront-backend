import { OrderStore, NewOrder } from '../../models/order';

const orderStore = new OrderStore();

describe('Order model', (): void => {
  describe('Order model check methods', (): void => {
    it('should have a userOrders method', (): void => {
      expect(orderStore.userOrders).toBeDefined();
    });

    it('should have a create method', (): void => {
      expect(orderStore.create).toBeDefined();
    });

    it('should have a completeOrdersByUser method', (): void => {
      expect(orderStore.completeOrdersByUser).toBeDefined();
    });
  });

  describe('Order model method', (): void => {
    it('should return an array of orders', async (): Promise<void> => {
      const result = await orderStore.userOrders(1);
      expect(result).toBeInstanceOf(Array);
    });

    it('should add an order to the database and return it', async (): Promise<void> => {
      const order: NewOrder = {
        order: {
          user_id: 1,
          status: 'active'
        },
        product: {
          product_id: 1,
          quantity: 1
        }
      };
      const result = await orderStore.create(order);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return an array of orders based on the user id', async (): Promise<void> => {
      const result = await orderStore.completeOrdersByUser(1);
      expect(result).toBeInstanceOf(Array);
    });
  });
});
