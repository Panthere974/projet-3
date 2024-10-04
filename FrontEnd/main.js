import * as categories from './js/works.js';
import { loginRequest } from "./js/login.js";
import { login } from "./js/log.js";
import * as modalFunction from "./js/modal.js";

export const loginForm = document.querySelector('.login-form');
const button = document.getElementById('categories-all-button');
const token = window.localStorage.getItem('token');
const addImageButton = document.getElementById('add-image-button');

if (button) {
    categories.getCategories();
    categories.getAllWorks();
    button.addEventListener('click', categories.categoriesButtonActive);
}

if (loginForm) {
    loginForm.addEventListener('submit', loginRequest);
}

if (token) {
    login();
}

if (addImageButton) {
    addImageButton.addEventListener('click', modalFunction.openAddImageModal);
}

document.querySelectorAll('.modal-link').forEach(link => link.addEventListener('click', modalFunction.openModal));

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        modalFunction.closeModal(e);
    }
    if (e.key === 'Tab' && modal !== null) {
        modalFunction.focusInModal(e);
    }
});

