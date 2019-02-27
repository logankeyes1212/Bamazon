DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
 id INT NOT NULL Auto_increment PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price DECIMAL NOT NULL,
  stock_quantity DECIMAL NOT NULL

  
);
 SELECT * FROM products;