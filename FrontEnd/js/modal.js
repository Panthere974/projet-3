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

    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');
    const modalinsertImage = document.getElementById('modal-insert-image');
    const modalFormElements = document.querySelectorAll('.modal-form-element');

    modalTitle.textContent = 'Ajout photo';
    modalGallery.style.display = 'none';
    modalinsertImage.style.display = null;
    modalFormElements.forEach(element => element.style.display = null);
    e.target.setAttribute('type', 'submit');
    e.target.value = 'Valider';
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
