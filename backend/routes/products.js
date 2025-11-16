const express = require("express");
const router = express.Router();
const db = require("../db");

// ดูสินค้าทั้งหมด
router.get("/", (req, res) => {
  const sql = `SELECT * FROM products`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch products failed", error: err });
    res.json(results);
  });
});

// ดูสินค้าตาม ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM products WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch product failed", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

module.exports = router;
