// ดึง product id จาก query string
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    alert("No product ID provided");
    window.location.href = "/admin/product_management";
}

// ฟังก์ชันลบ
async function deleteProduct() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to delete product");
            return;
        }

        alert("Product deleted successfully!");
        window.location.href = "/admin/product_management";

    } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the product");
    }
}

// ผูกปุ่มลบ
document.querySelector(".p-delete-btn").addEventListener("click", deleteProduct);
