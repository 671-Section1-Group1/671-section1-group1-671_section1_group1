// ==================== Tab Switching ==================== 
const tabBtns = document.querySelectorAll('.tab-btn');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');

        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show/hide forms
        if (tabName === 'signin') {
            signinForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            signinForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    });
});

// ==================== Password Visibility Toggle ==================== 
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// ==================== Form Submission (Ready for Backend) ==================== 
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById('signin-email').value,
        password: document.getElementById('signin-password').value,
        remember: document.querySelector('input[name="remember"]').checked
    };

    console.log('Sign In Data:', formData);

    // TODO: Send to backend API
    // Example:
    // const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    // const result = await response.json();
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const formData = {
        first_name: document.getElementById('signup-first-name').value,
        last_name: document.getElementById('signup-last-name').value,
        email: document.getElementById('signup-email').value,
        phone_number: document.getElementById('signup-phone').value,
        password: password,
        agree_terms: document.querySelector('input[name="agree_terms"]').checked
    };

    console.log('Sign Up Data:', formData);

    // TODO: Send to backend API
    // Example:
    // const response = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    // const result = await response.json();
});

