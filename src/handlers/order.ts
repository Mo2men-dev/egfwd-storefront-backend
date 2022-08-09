import express, { Request, Response } from 'express';
import { NewOrder, OrderStore } from '../models/order';
import { verifyTokens } from '../middleware/jwtTokens';

const orderStore = new OrderStore();

const userOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderStore.userOrders(
      req.params.userId as unknown as number
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  const newOrder: NewOrder = {
    order: {
      user_id: req.body.user_id,
      status: req.body.status
    },
    product: {
      product_id: req.body.product_id,
      quantity: req.body.quantity
    }
  };
  try {
    const orderedProduct = await orderStore.create(newOrder);
    res.status(201).json(orderedProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const completeOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await orderStore.completeOrdersByUser(
      req.params.userId as unknown as number
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const orders = (app: express.Application) => {
  app.get('/orders/user/:userId', verifyTokens, userOrders);
  app.post('/orders/add', verifyTokens, create);
  app.get('/orders/complete/user/:userId', verifyTokens, completeOrdersByUser);
};

export default orders;
