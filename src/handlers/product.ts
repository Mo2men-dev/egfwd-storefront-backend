import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verifyTokens } from '../middleware/jwtTokens';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(parseInt(req.params['id']));
    if (result === null) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTopFive = async (req: Request, res: Response) => {
  try {
    const result = await store.getTopFive();

    if (result === null) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const result = await store.create(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const listByCategory = async (req: Request, res: Response) => {
  try {
    const result = await store.listByCategory(req.params['category']);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const products = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/product/:id', show);
  app.post('/products/add', verifyTokens, create);
  app.get('/products/top', getTopFive);
  app.get('/products/category/:category', listByCategory);
};

export default products;
