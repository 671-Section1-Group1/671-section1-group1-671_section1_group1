// ฟังก์ชันสมัครสมาชิก
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    first_name: document.getElementById("signup-first-name").value,
    last_name: document.getElementById("signup-last-name").value,
    email: document.getElementById("signup-email").value,
    phone_number: document.getElementById("signup-phone").value,
    password: document.getElementById("signup-password").value,
    confirm_password: document.getElementById("signup-confirm-password").value,
  };

  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);
});

// ฟังก์ชันล็อกอิน
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("signin-email").value,
    password: document.getElementById("signin-password").value
  };

  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (response.ok) {
    // บันทึก user ลง localStorage
    localStorage.setItem("user", JSON.stringify(result.user));

    // ✅ แยก role
    if (result.user.role === "admin") {
      // ถ้าเป็น admin → ไปหน้า admin dashboard
      window.location.href = "/contacts";
    } else {
      // ถ้าเป็น customer → ไปหน้า products
      window.location.href = "/";
    }

  } else {
    alert(result.message);
  }
});
