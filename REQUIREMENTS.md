## API Endpoints

#### Products

- Index Route : `'/products' [GET]` Returns an Array of all products.

- Show Route : `'/products/product/:id' [GET]` Returns one product based on the id.

- Create Route : `'/products/add' [POST]` Adds one product to the Database and returns the product's Object (<u>token is required</u>).

- Top Five Route : `'/products/top' [GET]` Returns an Array of top 5 products based on the sum of quantity and returns them ordered in a descending order.

- Category Route : `'/products/category/:category' [GET]` Returns an Array of a products belonging to the provided category.

#### Users

- Index Route : `'/users' [GET]` Returns an Array of all users ( <u>token is required</u>).

- Show Route : `'/users/:id' [GET]` Returns on user based on the id (<u>token is required</u>).

- Create Route : `'/users/sign-up' [POST]` Adds a user to the Database and returns the user's Object.

- Authenticate Route : `'/users/sign-in' [POST]` Returns a JWT token if the user exists and authenticated.

#### Orders

- User Orders Route : `'/orders/user/:userId' [GET]` Returns an Array of all orders done by a user (<u>token is required</u>).

- Add Order Route : `'/orders/add' [POST]` Adds an Order to the Database and returns the order's Object (<u>token is required</u>).

- Complete Orders Route : `'/orders/complete/user/:userId' [GET]` Returns an Array of all orders with the status of 'complete' for a specific user (<u>token is required</u>).

## Data Shapes

### Types

-  *orderStatus*  `ENUM` values `('active', 'complete')`

### Tables

1.  *products*
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`
- category `VARCHAR`

2.  *users*
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR`
- lastName `VARCHAR`
- password `VARCHAR`

3.  *orders*
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` [foreign key to users table] `REFERENCES users(id)`
- status `orderStatus`

4. *order_products*
	- id `SERIAL  PRIMARY  KEY`
	- order_id `INTEGER` [foreign key to orders table] `REFERENCES orders(id)`
	- product_id `INTEGER` [foreign key to products table] `REFERENCES products(id)`
	- quantity `INTEGER` 