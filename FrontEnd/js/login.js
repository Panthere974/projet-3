const editModeBar = document.getElementById('edit-mode-bar');
const header = document.querySelector('header');
const modifyButton = document.getElementById('modal-link');
const loginLogoutButton = document.getElementById('login-logout-button');

export const logout = function (e) {
    e.preventDefault();
    
    e.target.textContent = 'login';
    localStorage.removeItem('token');
    editModeBar.style.display = 'none';
    header.style.marginTop = '50px';
    modifyButton.style.display = 'none';
    loginLogoutButton.removeEventListener('click', logout);
};

export function isLog() {
    editModeBar.style.display = 'flex';
    header.style.marginTop = '109px';
    loginLogoutButton.textContent = 'logout';
    modifyButton.style.display = 'flex';
    loginLogoutButton.addEventListener('click', logout);
}

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