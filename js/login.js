// Import Firebase auth
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { loadLanguage } from './language.js';

// Elements
const loginBtn = document.getElementById('loginBtn');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const languageSelect = document.getElementById('languageSelect');
const errorMsg = document.getElementById('errorMsg');

// Password show/hide
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Language selection
languageSelect.addEventListener('change', () => {
    const lang = languageSelect.value;
    loadLanguage(lang);
});

// Login action
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = passwordInput.value;

    if(!email || !password){
        errorMsg.textContent = "Please enter email and password.";
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to dashboard after login
        window.location.href = "dashboard.html";
    } catch (err) {
        console.error(err);
        errorMsg.textContent = "Invalid credentials or user does not exist.";
    }
});
