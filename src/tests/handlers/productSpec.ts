import supertest from 'supertest';
import app from '../../..';

const request = supertest(app);

describe('Product Route', (): void => {
  it('should return all products', async (): Promise<void> => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add a product', async (): Promise<void> => {
    const product = {
      name: 'Product',
      price: 1,
      category: 'Category'
    };
    const response = await request
      .post('/products/add')
      .set({
        authorization: process.env.TEST_TOKEN
      })
      .send(product);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product');
  });

  it('should return a product', async (): Promise<void> => {
    const response = await request.get('/products/product/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return the top five products', async (): Promise<void> => {
    const response = await request.get('/products/top');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return all products in a category', async (): Promise<void> => {
    const response = await request.get('/products/category/Category');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return a 404 if the product is not found', async (): Promise<void> => {
    const response = await request.get('/products/100');
    expect(response.status).toBe(404);
  });
});
