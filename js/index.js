let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Show slide by index
function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners for navigation buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Start autoplay after the page loads
document.addEventListener("DOMContentLoaded", () => {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});


// ==================== Tab Functionality ====================
const ptTabBtns = document.querySelectorAll('.pt-tab-btn');
const ptTabs = document.querySelectorAll('.pt-tab-content');

ptTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // remove active from all btns
        ptTabBtns.forEach(b => b.classList.remove('active'));

        // remove active from all tabs
        ptTabs.forEach(t => t.classList.remove('active'));

        // activate clicked
        btn.classList.add('active');

        const tabId = btn.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});