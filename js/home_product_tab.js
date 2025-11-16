// โหลดสินค้า 3 หมวดตอนหน้า Home โหลดเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    loadTabs();
});

function loadTabs() {
    loadCategory("best", "tab-best-seller");
    loadCategory("new", "tab-new");
    loadCategory("recommend", "tab-recommend");
}

async function loadCategory(type, elementId) {
    const box = document.getElementById(elementId);
    box.innerHTML = "<p style='padding:20px;'>กำลังโหลด...</p>";

    try {
        const res = await fetch(`/api/home/${type}`);
        const data = await res.json();

        box.innerHTML = "";

        if (!data.length) {
            box.innerHTML = "<p>ไม่มีสินค้า</p>";
            return;
        }

        data.forEach(item => {
            // 👇 ใช้ชื่อ column ตาม DB จริง ๆ
            const img = fixImagePath(item.image_url);
            const name = item.name;
            const price = item.price;
            const desc = item.description;

            box.innerHTML += `
                <div class="pt-product-card">
                    <img src="${img}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <p class="price">฿${price}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error loading category:", type, err);
        box.innerHTML = "<p>โหลดไม่ได้</p>";
    }
}

// แก้ path รูปภาพให้ตรงกับโฟลเดอร์ assets ที่ serve จาก server.js
function fixImagePath(url) {
    if (!url) return "/assets/products/default.png";
    if (url.startsWith("../")) return url.replace("../", "/");
    if (!url.startsWith("/") && !url.startsWith("http")) return "/" + url;
    return url;
}
