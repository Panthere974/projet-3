export async function getAllWorks() {
    const gallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('.modal-gallery');
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    data.forEach(work => {
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
        figure.appendChild(imgGallery);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

        imgContainer.className = 'image-container';
        trashButton.className = 'trash-button';
        trash.className = 'fa-solid fa-trash-can fa-xs';
        imgModal.src = work.imageUrl;
        imgModal.alt = work.title;
        imgContainer.appendChild(imgModal);
        trashButton.appendChild(trash);
        imgContainer.appendChild(trashButton);
        modalGallery.appendChild(imgContainer);
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
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();

    data.forEach(category => {
        const button = document.createElement('button');
        button.className = 'categories-button';
        button.textContent = category.name;
        button.addEventListener('click', categoriesButtonActive);
        categories.appendChild(button);
    });
}