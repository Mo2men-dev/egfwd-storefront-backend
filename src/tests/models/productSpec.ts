import { ProductStore } from '../../models/product';

const productStore = new ProductStore();

describe('Product model', (): void => {
  describe('Product model check methods', (): void => {
    it('should have an index methode', (): void => {
      expect(productStore.index).toBeDefined();
    });

    it('should have a create methode', (): void => {
      expect(productStore.create).toBeDefined();
    });

    it('should have a get top five products methode', (): void => {
      expect(productStore.getTopFive).toBeDefined();
    });

    it('should have a show methode', (): void => {
      expect(productStore.show).toBeDefined();
    });

    it('should have a list by category methode', (): void => {
      expect(productStore.listByCategory).toBeDefined();
    });
  });

  describe('Product model method', (): void => {
    it('should return an array of products', async (): Promise<void> => {
      const result = await productStore.index();
      expect(result).toBeInstanceOf(Array);
    });

    it('should add a product to the database and return it', async (): Promise<void> => {
      const product = {
        name: 'Product',
        price: 1,
        category: 'Category'
      };
      const result = await productStore.create(product);
      expect(result).toBeInstanceOf(Object);
    });

    it('should return an array of top five products', async (): Promise<void> => {
      const result = await productStore.getTopFive();
      expect(result).toBeInstanceOf(Array);
    });

    it('should return an array of products based on the category', async (): Promise<void> => {
      const result = await productStore.listByCategory('Category');
      expect(result).toBeInstanceOf(Array);
    });

    it('should return a product based on the id', async (): Promise<void> => {
      const firstProduct = await productStore.index();
      const result = await productStore.show(1);
      expect(result).toEqual(firstProduct[0]);
    });

    it('should return null if the product is not found', async (): Promise<void> => {
      const result = await productStore.show(100);
      expect(result).toBeNull();
    });
  });
});
