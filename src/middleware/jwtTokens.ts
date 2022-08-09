import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = jwt.verify(
      req.headers['authorization'] as unknown as string,
      process.env.TOKEN_SECRET as string
    );
    if (token) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
