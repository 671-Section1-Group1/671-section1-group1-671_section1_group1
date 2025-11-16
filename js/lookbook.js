document.getElementById("lookbook-btn").addEventListener("click", searchLookbook);

async function searchLookbook() {
    const query = document.getElementById("lookbook-input").value.trim();
    const resultBox = document.getElementById("lookbook-results");

    if (!query) {
        alert("Please enter a style to search.");
        return;
    }

    const API_KEY = "S4oqyFS8r570rBbXRTd3mcnonMU0IlvdMrupz9_H1ZI"; 
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${API_KEY}`;

    resultBox.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        resultBox.innerHTML = "";

        if (!data.results || data.results.length === 0) {
            resultBox.innerHTML = "<p>No images found.</p>";
            return;
        }

        data.results.forEach(img => {
            const imageElement = document.createElement("img");
            imageElement.src = img.urls.small;
            imageElement.alt = query;
            resultBox.appendChild(imageElement);
        });

    } catch (err) {
        console.error("Error fetching images:", err);
        resultBox.innerHTML = "<p>Error fetching images.</p>";
    }
}
