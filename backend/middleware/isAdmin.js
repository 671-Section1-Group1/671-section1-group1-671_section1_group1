// middleware/isAdmin.js
function isAdmin(req, res, next) {
  // สมมติว่าคุณส่ง user object ผ่าน request (เช่น decode JWT)
  // สำหรับตัวอย่างนี้ สมมติ client ส่ง role ใน header (ในระบบจริง ควรใช้ JWT)
  const role = req.headers['x-user-role']; // 'admin' หรือ 'customer'

  if (!role || role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
}

module.exports = isAdmin;
