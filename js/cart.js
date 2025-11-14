//cart.js
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartBadge();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);

    if (index > -1) {
        cart[index].quantity++;
    } else {
        cart.push(product);
    }

    saveCart(cart);
    updateCartBadge();
}

// ✅ Display Cart UI
function displayCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total-price");

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:20px;" class="empty-cart">Cart is empty</p>`;
        totalEl.textContent = "฿0";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="cart-item">
            <div class="cart-info">
                <img src="${item.img}" class="cart-img" alt="${item.name}">
                <span  class="cart-product-name">${item.name}</span>
            </div>

            <span class="cart-price">฿${item.price}</span>

            <div class="cart-qty">
                <button class="qty-btn" onclick="decreaseQty('${item.id}')">-</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="increaseQty('${item.id}')">+</button>
            </div>

            <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
        </div>`;
    });

    totalEl.textContent = `฿${total.toLocaleString()}`;
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    displayCart();
    updateCartBadge();
}

function increaseQty(id) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    item.quantity++;
    saveCart(cart);
    displayCart();
}

function decreaseQty(id) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    
    if (item.quantity > 1) item.quantity--;
    else cart = cart.filter(i => i.id !== id);

    saveCart(cart);
    displayCart();
}

function updateCartBadge() {
    const badge = document.querySelector(".cart-badge");
    if (!badge) return;
    const cart = getCart();
    badge.textContent = cart.reduce((a, c) => a + c.quantity, 0);
}


