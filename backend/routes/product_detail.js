const express = require("express");
const router = express.Router();
const db = require("../db");

// ดึงรายละเอียดสินค้า
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.send("Error: " + err);

    if (result.length === 0) {
      return res.send("ไม่พบสินค้า");
    }

    res.render("productDetails", { product: result[0] });
  });
});

module.exports = router;
