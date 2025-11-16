let deleteId = null;

async function loadProducts(filter={}) {
  try {
    let url = "/api/admin/products";
    const params = new URLSearchParams();
    if (filter.name) params.append("name", filter.name);
    if (filter.category) params.append("category", filter.category);
    if ([...params].length) url += "?" + params.toString();

    const res = await fetch(url);
    const products = await res.json();
    const table = document.getElementById("productTable");
    table.innerHTML = "";
    if (!products.length) { table.innerHTML = "<tr><td colspan='6'>ไม่พบสินค้า</td></tr>"; return; }

    products.forEach(item => {
      table.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.price}</td>
          <td>${item.stock}</td>
          <td>
            <button onclick="editProduct(${item.id})">Edit</button>
            <button onclick="showDeleteModal(${item.id})">Delete</button>
          </td>
        </tr>`;
    });
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการโหลดสินค้า");
  }
}

// Add / Edit
document.getElementById("addNewBtn").addEventListener("click", () => {
  location.href="/product_management_add";
});
function editProduct(id){
  location.href="/edit_product.html?id=" + id;
}

// Search / Reset
document.getElementById("btnSearch").addEventListener("click", ()=>{
  loadProducts({
    name: document.getElementById("searchName").value,
    category: document.getElementById("searchCategory").value
  });
});
document.getElementById("btnReset").addEventListener("click", ()=>{
  document.getElementById("searchName").value="";
  document.getElementById("searchCategory").value="";
  loadProducts();
});
