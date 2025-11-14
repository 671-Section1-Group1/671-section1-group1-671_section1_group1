// โหลดสินค้า
async function loadProducts() {
  const res = await fetch("/admin/products");
  const data = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.price}</td>
        <td>
          <button onclick="editProduct(${item.id})">Edit</button>
          <button onclick="deleteProduct(${item.id})">Delete</button>
        </td>
      </tr>`;
  });
}

// เพิ่มสินค้า
document.getElementById("addNewBtn").addEventListener("click", async () => {
  const name = prompt("ชื่อสินค้า:");
  const category = prompt("ประเภทสินค้า:");
  const price = prompt("ราคาสินค้า:");

  const res = await fetch("/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, price })
  });
  
  const data = await res.json();
  alert(data.message);
  loadProducts();
});

// แก้ไขสินค้า
async function editProduct(id) {
  const name = prompt("ชื่อสินค้าใหม่:");
  const category = prompt("ประเภทใหม่:");
  const price = prompt("ราคาใหม่:");

  const res = await fetch(`/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, price })
  });

  const data = await res.json();
  alert(data.message);
  loadProducts();
}

// ลบสินค้า
async function deleteProduct(id) {
  if (confirm("ต้องการลบสินค้านี้หรือไม่?")) {
    const res = await fetch(`/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message);
    loadProducts();
  }
}

// โหลดตารางตอนเริ่ม
loadProducts();
