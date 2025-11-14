// เปิด/ปิด Search Modal
function toggleSearch() {
    const modal = document.getElementById("search-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// กด Search แล้ว filter ด้วย LocalStorage ก่อน
function performSearch() {
    try {
        const name = document.getElementById("search-name")?.value?.toLowerCase() || "";
        const material = document.getElementById("search-material")?.value?.toLowerCase() || "";
        const lens = document.getElementById("search-lens")?.value?.toLowerCase() || "";
        const priceMin = document.getElementById("price-min")?.value || "";
        const priceMax = document.getElementById("price-max")?.value || "";

        const query = { name, material, lens, priceMin, priceMax };

        // ส่งค่าการค้นหาไปหน้า Product
        localStorage.setItem("searchQuery", JSON.stringify(query));
        console.log("Search query saved:", query);

        // Redirect ไป Products page
        console.log("Navigating to /products");
        window.location.href = "/products";
    } catch (error) {
        console.error("Error in performSearch:", error);
        // Fallback: try to navigate anyway
        window.location.href = "/products";
    }
}

function clearSearch() {
    document.getElementById("search-name").value = "";
    document.getElementById("search-material").value = "";
    document.getElementById("search-lens").value = "";
    document.getElementById("price-min").value = "";
    document.getElementById("price-max").value = "";
}

// คลิกนอกกล่อง modal → ปิด
window.addEventListener('click', (e) => {
    const modal = document.getElementById("search-modal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});