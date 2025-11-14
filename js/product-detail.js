// Get ID from URL (e.g., products_detail.html?id=3)
const id = new URLSearchParams(location.search).get("id");

// Load product data
fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(p => {
    if (!p || p.message) {
      document.getElementById("pd-name").textContent = "Product Not Found";
      return;
    }
    document.getElementById("pd-name").textContent = p.name;
    document.getElementById("pd-price").textContent = "฿" + Number(p.price).toLocaleString();
    document.getElementById("pd-material").textContent = p.material || "-";
    document.getElementById("pd-lens").textContent = p.lens || "-";
    document.getElementById("pd-desc").textContent = p.description || "-";
    document.getElementById("pd-img").src = p.image_url || "/assets/products/default.png";
  });

// Add to cart logic (optional: you can expand this)
document.getElementById("add-to-cart-btn").onclick = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const product = {
    id,
    name: document.getElementById("pd-name").textContent,
    price: Number(document.getElementById("pd-price").textContent.replace("฿", "").replace(",", "")),
    img: document.getElementById("pd-img").src,
    quantity: 1,
  };

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
};
