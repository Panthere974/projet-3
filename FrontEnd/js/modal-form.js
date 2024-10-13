import { addImageButton } from "../main.js";
import { displayWork } from "./works.js";

export let formIsCompleted = false;

const modalNavBar = document.querySelector('.modal-nav-bar');
const modalReturn = document.querySelector('.modal-return');
const modalTitle = document.getElementById('modal-title');
const modalGallery = document.getElementById('modal-gallery');
const modalForm = document.getElementById('modal-form');
const inputPhotoFile = document.getElementById('photo-file');
const errorMessage = document.querySelector('.error-message');
const modalFormElements = document.querySelectorAll('.modal-form-element');
const modalDivider = document.querySelector('hr');
const token = window.localStorage.getItem('token');

const choosePhotoFile = function (e) {
    e.preventDefault();

    const divPhotoFile = document.querySelector('.photo-file');
    const file = e.target.files[0];
    const reader = new FileReader();

    Array.from(divPhotoFile.children).forEach(child => {
        child.style.display = 'none';
    });

    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'to-delete';
        img.style.maxWidth = '30%';

        divPhotoFile.appendChild(img);
    };
    reader.readAsDataURL(file);
}

const addWork = async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const photoFileContent = document.querySelector('.photo-file-content');
    const toDelete = document.querySelector('.to-delete');
    const inputTitle = document.getElementById('title');
    const selectCategory = document.getElementById('category');

    if (formIsCompleted) {
        formData.append('image', inputPhotoFile.files[0]);
        formData.append('title', inputTitle.value);
        formData.append('category', selectCategory.value);


        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            displayWork(data);
            photoFileContent.style.display = null;
            toDelete.remove();
            inputPhotoFile.value = null;
            inputTitle.value = null;
            selectCategory.value = null;
            formIsCompleted = false;
        }
    } else {
        errorMessage.style.display = null;
    }
}

const checkForm = function () {

    errorMessage.style.display = 'none';
    formIsCompleted = [...modalForm.querySelectorAll('input[required], select[required]')].every(input => input.value.trim() !== '');

    if (formIsCompleted) {
        addImageButton.style.backgroundColor = '#1D6154';
    } else {
        addImageButton.style.backgroundColor = '#A7A7A7';
    }
}

const closeAddImageModal = function (e) {
    e.preventDefault();

    const errorMessage = document.querySelector('.error-message');

    modalNavBar.style.justifyContent = 'end';
    e.target.style.display = 'none';
    e.target.removeEventListener('click', closeAddImageModal);
    modalTitle.textContent = 'Galerie photo';
    modalGallery.style.display = null;
    modalForm.removeEventListener('input', checkForm);
    inputPhotoFile.removeEventListener('change', choosePhotoFile);
    errorMessage.style.display = 'none';
    modalFormElements.forEach(element => element.style.display = 'none');
    modalDivider.style.marginTop = '0px';
    addImageButton.removeEventListener('click', addWork);
    addImageButton.style.backgroundColor = '#1D6154';
    addImageButton.value = 'Ajouter une photo';
}

export const openAddImageModal = function (e) {
    e.preventDefault();

    modalNavBar.style.justifyContent = 'space-between';
    modalReturn.style.display = null;
    modalReturn.addEventListener('click', closeAddImageModal);
    modalTitle.textContent = 'Ajout photo';
    modalGallery.style.display = 'none';
    modalForm.addEventListener('input', checkForm);
    inputPhotoFile.addEventListener('change', choosePhotoFile);
    modalFormElements.forEach(element => element.style.display = null);
    modalDivider.style.marginTop = '50px';
    e.target.addEventListener('click', addWork);
    e.target.style.backgroundColor = '#A7A7A7';
    e.target.value = 'Valider';
}