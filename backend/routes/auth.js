// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// สมัครสมาชิก
router.post("/register", (req, res) => {
  const { first_name, last_name, email, phone_number, password, confirm_password } = req.body;

  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const fullname = `${first_name} ${last_name}`;

  // ใช้ password เป็น plain text
  const sql = `INSERT INTO users (username, email, password, fullname, phone)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [email.split("@")[0], email, password, fullname, phone_number], (err, result) => {
    if (err) {
      console.error("Register error:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already exists." });
      }
      return res.status(500).json({ message: "Server error." });
    }

    res.status(201).json({ message: "Registration successful!" });
  });
});

// เข้าสู่ระบบ
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // ตรวจสอบ password แบบ plain text
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  });
});

module.exports = router;
