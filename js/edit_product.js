const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch(`/api/admin/products/${productId}`);
    const product = await res.json();

    document.getElementById("name").value = product.name;
    document.getElementById("material").value = product.material;
    document.getElementById("lens").value = product.lens;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("description").value = product.description;
    document.getElementById("image_url").value = product.image_url;
});

document.getElementById("editProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        material: document.getElementById("material").value,
        lens: document.getElementById("lens").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
        image_url: document.getElementById("image_url").value
    };

    const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "/product_management";
});

document.getElementById("deleteBtn").addEventListener("click", async () => {
    if (!confirm("ต้องการลบสินค้านี้หรือไม่?")) return;
    const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "/product_management";
});
