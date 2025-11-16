const express = require("express");
const router = express.Router();
const db = require("../db");

// Best Seller — สต็อกน้อยสุด 6 อันดับ
router.get("/best", (req, res) => {
    const sql = "SELECT * FROM products ORDER BY stock ASC LIMIT 6";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// New — สินค้าที่เพิ่งเพิ่มล่าสุด (id มากสุด)
router.get("/new", (req, res) => {
    const sql = "SELECT * FROM products ORDER BY id DESC LIMIT 6";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Recommend — random 6 อัน
router.get("/recommend", (req, res) => {
    const sql = "SELECT * FROM products ORDER BY RAND() LIMIT 6";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

module.exports = router;
