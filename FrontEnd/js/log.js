const editModeBar = document.getElementById('edit-mode-bar');
const header = document.getElementsByTagName('header')[0];
const loginLogoutButton = document.getElementById('login-logout-button');
const modifyButton = document.getElementById('modify-button');

const logout = function(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    editModeBar.style.display = 'none';
    header.style.marginTop = '50px';
    loginLogoutButton.textContent = 'login';
    modifyButton.style.display = 'none'
    loginLogoutButton.removeEventListener('click', logout);
}

export function login() {
    editModeBar.style.display = 'flex';
    header.style.marginTop = '109px';
    loginLogoutButton.textContent = 'logout';
    modifyButton.style.display = 'inline'
    loginLogoutButton.addEventListener('click', logout);
}