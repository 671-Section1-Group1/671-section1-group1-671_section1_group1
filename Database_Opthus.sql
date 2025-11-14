CREATE DATABASE opthus;
USE opthus;

-- ตารางผู้ใช้
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  role ENUM('customer','admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ตารางสินค้า
CREATE TABLE products(  
id INT AUTO_INCREMENT PRIMARY KEY,  
name VARCHAR(100) NOT NULL,  
material VARCHAR(100), -- เพิ่มตรงนี้  
lens VARCHAR(100), -- เพิ่มตรงนี้  
category VARCHAR(50),  
price DECIMAL(10,2),  
stock INT DEFAULT 0,  
description TEXT,  
image_url VARCHAR(255) 
);

-- ตารางตะกร้าสินค้า
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ตารางคำสั่งซื้อ
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10,2),
  status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- รายการสินค้าในคำสั่งซื้อ
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM users;
SELECT * FROM products;
INSERT INTO products (name, material, lens, category, price, stock, description, image_url)
VALUES
('Product1', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product1', '../assets/products/Phanton_Black_Clear_Per.png'),
('Product2', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product2', '../assets/products/Phanton_Black_Clear_Per.png'),
('Product3', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product3', '../assets/products/Phanton_Black_Clear_Per.png'),
('Product4', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product4', '../assets/products/Phanton_Black_Clear_Per.png'),
('Product5', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product5', '../assets/products/Phanton_Black_Clear_Per.png'),
('Product6', 'Acetate', 'BlueCut', 'Eyeglasses', 2990.00, 10, 'แว่นตาเลนส์กรองแสงสีฟ้า รุ่น Product6', '../assets/products/Phanton_Black_Clear_Per.png');
SET FOREIGN_KEY_CHECKS = 1;

UPDATE products 
SET price = 3490.00 
WHERE id = 2;
UPDATE products 
SET price = 3990.00 
WHERE id = 3;
UPDATE products 
SET price = 3990.00 
WHERE id = 4;
UPDATE products 
SET price = 3990.00 
WHERE id = 5;
UPDATE products 
SET price = 3990.00 
WHERE id = 6;


UPDATE users 
SET phone = "0918374545" 
WHERE id = 3;

UPDATE users 
SET password = admin123
WHERE id = 3;
INSERT INTO users (username, email, password, fullname, role) 
VALUES (
  'Admin', 
  'admin@example.com', 
  'admin123',  -- รหัสผ่าน: admin123
  'Admin_User', 
  'admin'
);
DELETE FROM users
WHERE id = 3;


