import { loginForm } from "../main.js";

export const loginRequest = async function(e) {
    e.preventDefault();

    const errorMessage = document.querySelector('.error-message');
    const loginInput = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
    }
    const loginJson = JSON.stringify(loginInput);
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: loginJson
    });
    const data = await response.json();

    if (!response.ok) {
        errorMessage.style.display = null;
    } else {
        errorMessage.style.display = 'none';
        window.localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    }
}