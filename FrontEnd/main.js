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

    if (currentPath.endsWith("FrontEnd/") || currentPath.endsWith("index.html")) {
        const button = document.getElementById("categories-all-button");

        getAllWorks();
        getCategories();

        button.addEventListener('click', () => {
            const buttons = document.querySelectorAll('.categories button');

            getCategoryWorks("Tous");
            buttons.forEach(button => button.className = "");
            button.className = "active";
        });
    } else if (currentPath.endsWith("login.html")) {
        const errorMessage = document.querySelector('.error-message');

        document.querySelector('.login-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const login = {
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="password"]').value,
            }
            const loginJson = JSON.stringify(login);
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: loginJson
            });
            const data = await response.json();
            if (!response.ok) {
                errorMessage.style.display = "block";
            } else {
                errorMessage.style.display = "none";
                window.localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            }
        });
    }
});

let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".modal-close").addEventListener('click', closeModal);
    modal.querySelector(".modal-stop").addEventListener('click', stopPropagation);
    
}

const closeModal = function (e) {
    if (modal == null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".modal-close").removeEventListener('click', closeModal);
    modal.querySelector(".modal-stop").removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

const modalLink = document.querySelectorAll(".modal-link").forEach(link => {
    link.addEventListener('click', openModal);
});

const focusInModal = function(e) {
    e.preventDefault();
    //à faire
}

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
});

const token = window.localStorage.getItem("token");
const editModeBar = document.getElementById("edit-mode-bar");
const header = document.getElementsByTagName("header")[0];
const loginLogoutButton = document.getElementById("login-logout-button");
const modifyButton = document.getElementById("modify-button");

const logout = function(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    editModeBar.style.display = 'none';
    header.style.marginTop = '50px';
    loginLogoutButton.textContent = "login";
    modifyButton.style.display = "none"
    loginLogoutButton.removeEventListener("click", logout);
}

if (token) {
    editModeBar.style.display = 'flex';
    header.style.marginTop = '109px';
    loginLogoutButton.textContent = "logout";
    modifyButton.style.display = "inline"
    loginLogoutButton.addEventListener("click", logout);
}

