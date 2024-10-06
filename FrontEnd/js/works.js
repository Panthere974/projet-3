const deleteWork = async function(/*e,*/ id) {
    //e.preventDefault(); à modifier ?

    const token = window.localStorage.getItem('token');
    const workToDelete = document.querySelectorAll(`[data-id="${id}"]`);
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (response.ok) {
        workToDelete.forEach(work => work.remove());
    }
}

export function dynamicAddWork(work) {
    const gallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('.modal-gallery');

    const figure = document.createElement('figure');
    const imgGallery = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    const imgContainer = document.createElement('div');
    const trashButton = document.createElement('button');
    const trash = document.createElement('i');
    const imgModal = document.createElement('img');

    imgGallery.src = work.imageUrl;
    imgGallery.alt = work.title;
    figcaption.textContent = work.title;
    figure.setAttribute('data-id', work.id);
    figure.appendChild(imgGallery);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    imgContainer.className = 'image-container';
    trashButton.className = 'trash-button';
    trash.addEventListener('click', () => deleteWork(work.id));
    trash.className = 'fa-solid fa-trash-can fa-xs';
    imgModal.src = work.imageUrl;
    imgModal.alt = work.title;
    imgContainer.setAttribute('data-id', work.id);
    imgContainer.appendChild(imgModal);
    trashButton.appendChild(trash);
    imgContainer.appendChild(trashButton);
    modalGallery.appendChild(imgContainer);
}

export async function getAllWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    data.forEach(work => {
        dynamicAddWork(work);
    });
}

export async function getCategoryWorks(category) {
    const gallery = document.querySelector('.gallery');
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    gallery.innerHTML = '';

    data.forEach(work => {
        if(work.category.name === category || category === 'Tous') {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);   
        }
    });
}

export const categoriesButtonActive = function(e) {
    const button = e.target;
    const buttons = document.querySelectorAll('.categories-button');
    buttons.forEach(button => button.classList.remove('active'));
    getCategoryWorks(button.textContent);
    button.classList.add('active')
}

export async function getCategories() {
    const categories = document.querySelector('.categories');
    const selector = document.getElementById('category');
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();

    let counter = 1

    data.forEach(category => {
        const button = document.createElement('button');
        const option = document.createElement('option');
        
        button.className = 'categories-button';
        button.textContent = category.name;
        button.addEventListener('click', categoriesButtonActive);
        categories.appendChild(button);

        option.value = counter;
        option.textContent = category.name;
        selector.appendChild(option);

        counter++;
    });
}