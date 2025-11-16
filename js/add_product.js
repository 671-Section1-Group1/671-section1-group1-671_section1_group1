document.getElementById("addProductForm").addEventListener("submit", async (e) => {
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

    const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "/product_management";
});
