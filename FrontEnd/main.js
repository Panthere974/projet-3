async function getAllWorks() {
    const gallery = document.querySelector(".gallery");
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    data.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

async function getCategoryWorks(category) {
    const gallery = document.querySelector(".gallery");
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    gallery.innerHTML = "";

    data.forEach(work => {
        if(work.category.name == category || category == "Tous") {
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

async function getCategories() {
    const categories = document.querySelector(".categories");
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    data.forEach(category => {
        const button = document.createElement('button');
        button.id = "categories-button";
        button.textContent = category.name;
        button.addEventListener('click', () => {
            const buttons = document.querySelectorAll('.categories button');

            getCategoryWorks(category.name);
            buttons.forEach(button => button.className = "");
            button.className = "active";
        });
        categories.appendChild(button);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.className = "";
    });

    if (currentPath.endsWith("login.html")) {
        navLinks[2].className = "active";
    }

    if (currentPath.endsWith("FrontEnd/")) {
        const button = document.getElementById("categories-all-button");

        getAllWorks();
        getCategories();

        button.addEventListener('click', () => {
            const buttons = document.querySelectorAll('.categories button');

            getCategoryWorks("Tous");
            buttons.forEach(button => button.className = "");
            button.className = "active";
        });
    }
});
