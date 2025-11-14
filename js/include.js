function includeHTML(filePath, elementId, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.innerHTML = html;
            }
            if (callback) callback();
        })
        .catch(error => console.error("Include Error:", error));
}


includeHTML("/components/navbar", "header-placeholder", () => {
    document.dispatchEvent(new Event("NavbarLoaded"));
});

includeHTML("/components/navAdmin", "headerAdmin-placeholder");

includeHTML("/components/footer", "footer-placeholder");
includeHTML("/components/search", "search-placeholder");
