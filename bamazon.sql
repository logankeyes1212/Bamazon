DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
 id INT NOT NULL Auto_increment PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price FLOAT NOT NULL,
  stock_quantity DECIMAL NOT NULL

  
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alexa", "electronics", 49.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "kitchen", 149.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Right Hanes sock", "clothing", 59.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Umbrella", "travel gear", 20.49, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gopro", "electronics", 349.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Underware", "clothing", 7.95, 6000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dirty left shoe", "clothing", 600.49, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping bag", "travel gear", 49.99, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Elmers glue", "school goods", 4.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebook", "school goods", 1.99, 100);
 
 SELECT * FROM products;