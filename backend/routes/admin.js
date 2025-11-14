// routes/admin.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const isAdmin = require("../middleware/isAdmin");

/* ---------------------- PRODUCTS ---------------------- */
// ดูสินค้าตาม ID
router.get("/products/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM products WHERE id = ?`;
  
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch product failed", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]); // ส่งข้อมูลสินค้า 1 ชิ้นกลับไป
  });
});
// เพิ่มสินค้า
router.post("/products", isAdmin, (req, res) => {
  const { name, material, lens, category, price, stock, description, image_url } = req.body;
  const sql = `INSERT INTO products (name, material, lens, category, price, stock, description, image_url)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, material, lens, category, price, stock, description, image_url], (err, result) => {
    if (err) return res.status(500).json({ message: "Insert product failed", error: err });
    res.json({ message: "Product added successfully", productId: result.insertId });
  });
});

// แก้ไขสินค้า
router.put("/products/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const { name, material, lens, category, price, stock, description, image_url } = req.body;
  const sql = `UPDATE products SET name=?, material=?, lens=?, category=?, price=?, stock=?, description=?, image_url=? WHERE id=?`;
  db.query(sql, [name, material, lens, category, price, stock, description, image_url, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Update product failed", error: err });
    res.json({ message: "Product updated successfully" });
  });
});

// ลบสินค้า
router.delete("/products/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE id=?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete product failed", error: err });
    res.json({ message: "Product deleted successfully" });
  });
});

// ดูสินค้าทั้งหมด
router.get("/products", isAdmin, (req, res) => {
  const sql = `SELECT * FROM products`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch products failed", error: err });
    res.json(results);
  });
});

/* ---------------------- CUSTOMERS ---------------------- */
router.get("/users/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const sql = `SELECT id, username, email, role FROM users WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch user failed", error: err });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});
// ดูลูกค้าทั้งหมด
router.get("/users", isAdmin, (req, res) => {
  const sql = `SELECT id, fullname, email, phone, role FROM users WHERE role='customer'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch customers failed", error: err });
    res.json(results);
  });
});

// เพิ่มลูกค้า
router.post("/users", isAdmin, (req, res) => {
  const { fullname, email, phone, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "กรุณากรอก fullname, email, password" });
  }

  const username = email.split("@")[0]; // สร้าง username จาก email

  const sql = `INSERT INTO users (username, email, phone, password, fullname, role)
               VALUES (?, ?, ?, ?, ?, 'customer')`;

  db.query(sql, [username, email, phone, password, fullname], (err, result) => {
    if (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email หรือ Username ซ้ำ" });
      }
      return res.status(500).json({ message: "Insert customer failed", error: err });
    }
    res.status(201).json({ message: "Customer added successfully", customerId: result.insertId });
  });
});

// แก้ไขลูกค้า
router.put("/users/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const { fullname, email, phone, password } = req.body;

  let sql, params;
  if (password) {
    sql = `UPDATE users SET fullname=?, email=?, phone=?, password=? WHERE id=? AND role='customer'`;
    params = [fullname, email, phone, password, id];
  } else {
    sql = `UPDATE users SET fullname=?, email=?, phone=? WHERE id=? AND role='customer'`;
    params = [fullname, email, phone, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ message: "Update customer failed", error: err });
    res.json({ message: "Customer updated successfully" });
  });
});

// ลบลูกค้า
router.delete("/users/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id=? AND role='customer'`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete customer failed", error: err });
    res.json({ message: "Customer deleted successfully" });
  });
});

/* ---------------------- ADMIN SELF PROFILE ---------------------- */

// แก้ไขข้อมูลแอดมินตัวเอง
router.put("/profile", isAdmin, (req, res) => {
  // สมมติ req.user.id ถูกเซ็ตจาก middleware isAdmin หรือ auth
  const adminId = req.user.id; 
  const { fullname, email, phone, password } = req.body;

  let sql, params;

  if (password) {
    sql = `UPDATE users SET fullname=?, email=?, phone=?, password=? WHERE id=? AND role='admin'`;
    params = [fullname, email, phone, password, adminId];
  } else {
    sql = `UPDATE users SET fullname=?, email=?, phone=? WHERE id=? AND role='admin'`;
    params = [fullname, email, phone, adminId];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ message: "Update admin profile failed", error: err });
    res.json({ message: "Admin profile updated successfully" });
  });
});

module.exports = router;
