import express from 'express';
import cors from 'cors';
import products from './src/handlers/product';
import users from './src/handlers/users';
import orders from './src/handlers/order';

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes
products(app);
users(app);
orders(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
