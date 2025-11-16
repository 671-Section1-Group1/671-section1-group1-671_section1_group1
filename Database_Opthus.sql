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
('SPYGAME EYEWEAR', 'Acetate', 'Dark', 'Eyeglasses', 3490.00, 10,
 'ดีไซน์เรียบเท่ด้วยวัสดุ Acetate คุณภาพสูง เบาและทนทาน เลนส์กรองแสงช่วยลดอาการล้าจากหน้าจอ เหมาะกับสายทำงานและสายเกมที่ต้องการแว่นพรีเมียมโทนจริงจัง',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('WAKU WAKU EYEWEAR', 'Nickel-Titanium', 'Blush', 'Eyeglasses', 2990.00, 10,
 'โครง Nickel-Titanium น้ำหนักเบาพิเศษ ยืดหยุ่นสูง ไม่เป็นสนิม โทนสี Blush ช่วยเพิ่มความสดใสและความละมุน สวมใส่สบายทั้งวันโดยแทบไม่รู้สึกว่าใส่แว่น',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('PHANTOM', 'Exated Stainless Steel', 'Clear', 'Eyeglasses', 3990.00, 10,
 'แว่นสเตนเลสพรีเมียมรุ่น PHANTOM น้ำหนักเบา แข็งแรง ดีไซน์เรียบหรู เลนส์กรองแสงช่วยลดความล้า เหมาะกับคนที่ชอบสไตล์มินิมอลที่ดูแพงและทันสมัย',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('ZERO', 'Nova Ultem', 'Black', 'Eyeglasses', 2290.00, 10,
 'เฟรม Nova Ultem ที่ขึ้นชื่อเรื่องความเบาและทนความร้อนสูง ดีไซน์บางเฉียบ น้ำหนักเบามาก ใส่แล้วไม่บีบหน้า เหมาะกับการใช้งานตลอดวัน',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('HOVER 2.0', 'Nickel-Titanium', 'Clear', 'Eyeglasses', 2490.00, 10,
 'ดีไซน์ลอยตัวแบบมินิมอล ใช้วัสดุ Nickel-Titanium ที่ยืดหยุ่นและทนทานสุด ๆ ช่วยให้สวมใส่สบาย ไม่หนักหน้า เหมาะกับทุกลุคทุกสถานการณ์',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('NEBULA 2.0', 'Nickel-Titanium', 'Blush', 'Eyeglasses', 2490.00, 10,
 'ดีไซน์บางเบาในโทน Blush ดูอบอุ่นและทันสมัย วัสดุ Nickel-Titanium ยืดหยุ่นดี ไม่กดทับ สวมสบายทั้งวัน เหมาะกับสายมินิมอลที่ชอบความเรียบเนียน',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('INFINITE', 'Nova Ultem', 'Clear', 'Eyeglasses', 1790.00, 10,
 'เฟรม Ultem ที่เด็ดสุดในด้านความเบาและทนทาน ให้ความรู้สึกโปร่งสบาย ใส่แล้วหน้าไม่ล้า เหมาะกับคนที่ต้องการแว่นคุณภาพดีราคาคุ้มมาก',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('SABER', 'Nova Ultem', 'Clear', 'Eyeglasses', 2290.00, 10,
 'ลุคคมกริบด้วยดีไซน์ทรงทันสมัย วัสดุ Ultem เบาและทนความร้อนสูง ใส่ทำงานหรือเรียนทั้งวันได้แบบไม่หนักหน้า ดูดีแบบเรียบง่ายแต่มีพลัง',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('LIMITLESS', 'Stainless Steel', 'Clear', 'Eyeglasses', 1990.00, 10,
 'เฟรมบางเฉียบจาก Stainless Steel แข็งแรง น้ำหนักเบา ให้ลุคโปรสะอาดตามาก ๆ เหมาะกับการใช้งานทุกวันและเข้ากันได้กับทุกสไตล์',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('FUSE', 'Acetate', 'Clear', 'Eyeglasses', 2490.00, 10,
 'เฟรม Acetate ดีไซน์หนาแต่เบากว่าที่คิด ให้ลุคแฟชั่นแบบพรีเมียม ใส่แล้วหน้ามีมิติ เหมาะกับคนที่ต้องการสไตล์จัดเต็มแต่ยังสบายตา',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('FALCON', 'Exated Stainless Steel', 'Clear', 'Eyeglasses', 3990.00, 10,
 'ดีไซน์ดุดันแบบพรีเมียม เรียวบาง น้ำหนักเบา ตัวเฟรมแข็งแรงสุด ๆ เลนส์กรองแสงช่วยถนอมสายตา เหมาะกับคนที่ชอบลุคเฉียบคมและเป็นเอกลักษณ์',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('HALO', 'Exated Stainless Steel', 'Clear', 'Eyeglasses', 3990.00, 10,
 'แว่นทรงมินิมอลหวาน ๆ ด้วยเส้นเฟรมบางเรียบหรู วัสดุแข็งแรงและเบา เลนส์กรองแสงช่วยลดอาการล้า เหมาะกับสายที่ชอบความเรียบพรีเมียม',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('LIFELINE', 'Exated Stainless Steel', 'Clear', 'Eyeglasses', 3990.00, 10,
 'ดีไซน์ร่วมสมัยแบบเส้นสายคลีน ๆ วัสดุสเตนเลสพรีเมียม น้ำหนักเบา ใส่แล้วหน้าไม่หนัก เหมาะกับคนที่ชอบแว่นเรียบง่าย ไม่ฉูดฉาด แต่ดูแพง',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('SPITFIRE', 'Exated Stainless Steel', 'Amber', 'Eyeglasses', 3990.00, 10,
 'ลุคเข้มมีโทน Amber สวยโดดเด่น วัสดุสเตนเลสคุณภาพสูง ทนทานและเบา ให้ความรู้สึกมั่นใจทุกครั้งที่ใส่ เหมาะกับคนที่อยากได้แว่นมีคาแรกเตอร์',
 '../assets/products/Phanton_Black_Clear_Per.png'),

('KEPLER', 'Stainless Steel', 'Clear', 'Eyeglasses', 2490.00, 10,
 'ดีไซน์คลีนสุดมินิมอล เฟรม Stainless Steel เบาและดูหรู สวมใส่ง่ายกับทุกรูปหน้า เหมาะกับการใช้งานจริงได้ทุกวัน ไม่ว่าจะทำงาน เรียน หรือออกนอกบ้าน',
 '../assets/products/Phanton_Black_Clear_Per.png');

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


