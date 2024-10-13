const deleteWork = async function(id) {
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

export async function displayCategoryWorks(category) {
    const galleryImages = document.querySelectorAll('.gallery figure');
    
    galleryImages.forEach(figure => {
        const workCategory = figure.getAttribute('data-category');

        if (!category || workCategory === category) {
            figure.style.display = null;
            
        } else {
            figure.style.display = 'none';
        }
    })
}

export const setActiveCategoryButton = function(e) {
    const activeButton = e.target;
    const categoryButtons = document.querySelectorAll('.category-button');

    categoryButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
    displayCategoryWorks(activeButton.getAttribute('data-category'));
}

export async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();
    const categories = document.querySelector('.categories');
    const selector = document.getElementById('category');

    let counter = 1;

    data.forEach(category => {
        const button = document.createElement('button');

        button.className = 'category-button';
        button.textContent = category.name;
        button.setAttribute('data-category', category.id);
        button.addEventListener('click', setActiveCategoryButton);
        categories.appendChild(button);

        const option = document.createElement('option');
        
        option.value = counter;
        option.textContent = category.name;
        selector.appendChild(option);

        counter++;
    });
}

export function displayWork(work) {
    const gallery = document.querySelector('.gallery');
    const figure = document.createElement('figure');
    const imgGallery = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    
    imgGallery.src = work.imageUrl;
    imgGallery.alt = work.title;
    figcaption.textContent = work.title;
    figure.className = 'gallery-image';
    figure.setAttribute('data-category', work.categoryId);
    figure.setAttribute('data-id', work.id);
    figure.appendChild(imgGallery);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    
    const modalGallery = document.querySelector('.modal-gallery');
    const imgContainer = document.createElement('div');
    const trashButton = document.createElement('button');
    const trash = document.createElement('i');
    const imgModal = document.createElement('img');

    imgContainer.className = 'image-container';
    trashButton.className = 'trash-button';
    trashButton.addEventListener('click', () => deleteWork(work.id));
    trash.className = 'fa-solid fa-trash-can fa-xs';
    imgModal.src = work.imageUrl;
    imgModal.alt = work.title;
    imgContainer.setAttribute('data-id', work.id);
    imgContainer.appendChild(imgModal);
    trashButton.appendChild(trash);
    imgContainer.appendChild(trashButton);
    modalGallery.appendChild(imgContainer);
}

export async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    data.forEach(work => {
        displayWork(work);
    });
}