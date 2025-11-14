// ✅ เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

// ✅ โหลดสินค้าจาก backend
async function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "<p>กำลังโหลดสินค้า...</p>";

    // ดึง query ที่ผู้ใช้ค้นหาจาก localStorage (มาจาก search.js)
    const query = JSON.parse(localStorage.getItem("searchQuery")) || {};

    // สร้าง query string (เช่น name=Product1&material=Acetate)
    const params = new URLSearchParams();
    if (query.name) params.append("name", query.name);
    if (query.material) params.append("material", query.material);
    if (query.lens) params.append("lens", query.lens);
    if (query.priceMin) params.append("priceMin", query.priceMin);
    if (query.priceMax) params.append("priceMax", query.priceMax);

    try {
        // ✅ เรียก API จาก backend (Node.js)
        const res = await fetch(`http://localhost:3000/api/search?${params.toString()}`);
        const products = await res.json();

        productList.innerHTML = "";

        // ถ้าไม่พบสินค้า
        if (!products.length) {
            productList.innerHTML = "<p>ไม่พบสินค้าที่ค้นหา</p>";
            return;
        }

        // ✅ แสดงสินค้าทั้งหมด
        products.forEach(p => {
            // Ensure image URL is absolute path
            let imageUrl = p.image_url || '/assets/products/default.png';
            if (imageUrl.startsWith('../')) {
                imageUrl = imageUrl.replace('../', '/');
            } else if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
                imageUrl = '/' + imageUrl;
            }
            
            productList.innerHTML += `
                <div class="product-card"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}"
                    data-img="${imageUrl}"
                    data-material="${p.material || ''}"
                    data-lens="${p.lens || ''}">
                    
                    <a href="/products_detail?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit; display: block; cursor: pointer;">
                        <img src="${imageUrl}" alt="${p.name}" class="product-img" style="cursor: pointer;">
                        <h3 class="product-name" style="cursor: pointer;">${p.name}</h3>
                        <p class="product-price" style="cursor: pointer;">฿${p.price}</p>
                    </a>
                    <button type="button" class="add-btn">Add to Cart</button>
                </div>
            `;
        });

        // ✅ ต้องเรียกหลังโหลดสินค้าเสร็จ
        initAddToCartButtons();
    } catch (err) {
        console.error("Error loading products:", err);
        productList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดสินค้า</p>";
    }
}

// Event กดปุ่ม Add to Cart (เหมือนเดิม)
function initAddToCartButtons() {
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop event from bubbling up to parent link
            const card = e.target.closest(".product-card");
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: Number(card.dataset.price),
                img: card.dataset.img,
                material: card.dataset.material,
                lens: card.dataset.lens,
                quantity: 1
            };

            addToCart(product);
            console.log("Added to Cart:", product);
        });
    });
}
