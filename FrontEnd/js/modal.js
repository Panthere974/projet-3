let modal = null;

const stopPropagation = function(e) {
    e.stopPropagation();
}

const focusInModal = function(e) {
    e.preventDefault();
    //à faire
}

export const openAddImageModal = function (e) {
    e.preventDefault();

    const modalNavBar = document.querySelector('.modal-nav-bar');
    const modalReturn = document.querySelector('.modal-return');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');
    const modalinsertImage = document.getElementById('modal-insert-image');
    const modalFormElements = document.querySelectorAll('.modal-form-element');

    modalNavBar.style.justifyContent = 'space-between';
    modalReturn.style.display = null;
    modalReturn.addEventListener('click', closeAddImageModal);
    modalTitle.textContent = 'Ajout photo';
    modalGallery.style.display = 'none';
    modalinsertImage.style.display = null;
    modalFormElements.forEach(element => element.style.display = null);
    e.target.value = 'Valider';
}

const closeAddImageModal = function (e) {
    e.preventDefault();

    const modalNavBar = document.querySelector('.modal-nav-bar');
    const modalReturn = document.querySelector('.modal-return');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');
    const modalinsertImage = document.getElementById('modal-insert-image');
    const modalFormElements = document.querySelectorAll('.modal-form-element');

    modalNavBar.style.justifyContent = 'end';
    modalReturn.style.display = 'none';
    modalReturn.removeEventListener('click', closeAddImageModal);
    modalTitle.textContent = 'Galerie photo';
    modalGallery.style.display = null;
    modalinsertImage.style.display = 'none';
    modalFormElements.forEach(element => element.style.display = 'none');
    e.target.value = 'Ajouter une photo';
}

export const openModal = function (e) {
    e.preventDefault();
    
    const target = document.querySelector(e.target.getAttribute('href'));

    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-stop').addEventListener('click', stopPropagation);
    
}

export const closeModal = function (e) {

    if (modal === null) return;
    e.preventDefault();

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}
