import * as categories from './js/works.js';
import { loginRequest } from "./js/login.js";
import { isLog } from "./js/login.js";
import * as modalFunction from "./js/modal.js";

export const loginForm = document.querySelector('.login-form');
export const addImageButton = document.getElementById('add-image-button');
const allCategoriesButton = document.getElementById('all-categories-button');
const token = window.localStorage.getItem('token');

if (allCategoriesButton) {
    categories.getWorks();
    categories.getCategories();
    allCategoriesButton.addEventListener('click', categories.setActiveCategoryButton);
}

if (loginForm) {
    loginForm.addEventListener('submit', loginRequest);
}

if (token) {
    isLog();
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

