// routes/search.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔍 ค้นหาสินค้า
router.get("/", (req, res) => {
  const { name, material, lens, priceMin, priceMax } = req.query;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (name) {
    sql += " AND name LIKE ?";
    params.push(`%${name}%`);
  }

  if (material) {
    sql += " AND material LIKE ?";
    params.push(`%${material}%`);
  }

  if (lens) {
    sql += " AND lens LIKE ?";
    params.push(`%${lens}%`);
  }

  if (priceMin) {
    sql += " AND price >= ?";
    params.push(priceMin);
  }

  if (priceMax) {
    sql += " AND price <= ?";
    params.push(priceMax);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
