import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import { verifyTokens } from '../middleware/jwtTokens';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id as unknown as number);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const newUser: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  try {
    const user = await store.authenticate(newUser);
    if (user) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const users = (app: express.Application) => {
  app.get('/users', verifyTokens, index);
  app.get('/users/:id', verifyTokens, show);
  app.post('/users/sign-up', create);
  app.post('/users/sign-in', authenticate);
};

export default users;
