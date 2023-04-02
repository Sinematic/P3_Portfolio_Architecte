import { displayError, displaySuccess } from "./alerts.js";

const body = document.querySelector("body");
const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");

const login = document.getElementById("login");
const logout = document.getElementById("logout");
const filters = document.getElementById("filters");

const btnNoFilter = document.getElementById("btn-no-filter");
const btnObjects = document.getElementById("btn-objects");
const btnHouses = document.getElementById("btn-houses");
const btnHotelsRestaurants = document.getElementById("btn-hotels-restaurants");
const editBar = document.getElementById("edit-bar");
const editBtn = document.getElementById("edit-btn");
const hiddenElements = document.querySelectorAll(".hidden");

const token = window.localStorage.getItem("token");
const success = window.localStorage.getItem("success-message");

if (token) {

    login.style.display = "none";
    logout.style.display = "block";
    filters.innerHTML = "";

    for (let i = 0; i < hiddenElements.length; i++)
    {
        hiddenElements[i].classList.toggle("hidden");
    }
    displayEditBar();

} else {
    
    login.style.display = "block";
    logout.style.display = "none";
}

if (success) {

    displaySuccess(success, portfolio, "authentified");
}

getData();
displayBtnColor(btnNoFilter);


async function getData(url = "works") {

    const base = "http://localhost:5678/api/"
    const response = await fetch(base + url);
    const result = await response.json();

    gallery.innerHTML = "";

    for (let i = 0; i < result.length; i++)
    {
        renderWork(result[i]);
    }

}


function renderWork(work) {

    const figure = document.createElement("figure");
    const img = document.createElement("img"); 
    const figcaption = document.createElement("figcaption");

    figcaption.innerText = work.title;
    img.src = work.imageUrl
    img.alt = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
}


async function getCategories() {

    const response = await fetch("http://localhost:5678/api/categories");
    const result = await response.json();

    for(let i = 0; i < result.length; i++)
    {
        // console.log(result[i].name);
    }
}


async function displayCategory(int) {

    const url = "http://localhost:5678/api/works"
    const response = await fetch(url);
    const result = await response.json();

    gallery.innerHTML = "";

    // console.log(result[0].categoryId === int);

    for (let i = 0; i < result.length; i++)
    {
        if (result[i].categoryId === int) {
            renderWork(result[i]);
        }
        
    }
}


async function displayModalGallery() {

    const url = "http://localhost:5678/api/works/"
    const response = await fetch(url);
    const works = await response.json();
    const modalGallery = document.getElementById("modal-gallery");

    modalGallery.innerHTML = "";

    for (let i = 0; i < works.length; i++)
    {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const text = document.createElement("p");
        const btnTrashCan = document.createElement("div");

        img.src = works[i].imageUrl;
        div.classList.add("modal-div-works");
        img.classList.add("modal-works-img");
        text.innerHTML = "éditer";

        div.appendChild(img);
        div.appendChild(text);
        modalGallery.appendChild(div);
            
        btnTrashCan.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        btnTrashCan.classList.add("div-btn");
        div.appendChild(btnTrashCan);
    }

}


function displayBtnColor(btn) {

    const buttons = document.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].style.color = "#1D6154";
        buttons[i].style.backgroundColor = "white";
    }
    
    btn.style.backgroundColor = "#1D6154";
    btn.style.color = "white";
}


function displayEditBar() {

    editBar.style.display = "flex";

}

getCategories();

btnNoFilter.addEventListener("click", function() {

    getData();
    displayBtnColor(btnNoFilter);
});

btnObjects.addEventListener("click", function() {

    displayCategory(1);
    displayBtnColor(btnObjects);
});

btnHouses.addEventListener("click", function() {

    displayCategory(2);
    displayBtnColor(btnHouses);
});

btnHotelsRestaurants.addEventListener("click", function() {

    displayCategory(3);
    displayBtnColor(btnHotelsRestaurants);

});

editBtn.addEventListener("click", function(){

    generateModal();

    const modal = document.getElementById("modal");

    modal.scrollIntoView({
        behavior: "smooth"
    });

});


function generateModal(modalTitle="Galerie photo") {

    
    const overlay = document.createElement("div");
    const modal = document.createElement("div");

    modal.innerHTML = ""; 

    const title = document.createElement("h1");
    const modalGallery = document.createElement("div");
    const modalSubmit = document.createElement("button");
    const modalDelete = document.createElement("button");
    const closeBtn = document.createElement("i");

    closeBtn.classList.add("fa-solid", "fa-xmark");
    closeBtn.setAttribute("id", "xmark");
    modal.appendChild(closeBtn);

    overlay.setAttribute("id", "overlay");
    body.appendChild(overlay);

    modal.setAttribute("id", "modal");
    editBar.appendChild(modal);

    title.innerText = modalTitle;
    title.setAttribute("id", "title");
    modal.appendChild(title);

    modalGallery.setAttribute("id", "modal-gallery");
    modal.appendChild(modalGallery);

    modalSubmit.innerHTML =  "Ajouter une photo";
    modalSubmit.setAttribute("id", "modal-add-img");
    modal.appendChild(modalSubmit);

    modalDelete.innerHTML = "Supprimer la galerie";
    modalDelete.setAttribute("id", "modal-delete");
    modal.appendChild(modalDelete);

    displayModalGallery(); 

    closeBtn.addEventListener("click", function() {

        closeModal();
    });

    overlay.addEventListener("click", function(event) {

        closeModal();

    });

    modalSubmit.addEventListener("click", function() {

        modalUploadPicture();
    });

}

function modalUploadPicture() {

    const modal = document.getElementById("modal");
    modal.style.height = "670px";

    modal.innerHTML = "";

    const title = document.createElement("h1");
    const modalSubmit = document.createElement("button");
    const closeBtn = document.createElement("i");
    const previous = document.createElement("i");
    const form = document.createElement("form");
    const fileInput = document.createElement("input");
    const divImg = document.createElement("div");
    const imgI = document.createElement("i");
    const labelImg = document.createElement("label");
    const labelTitle = document.createElement("label");
    const labelCategory = document.createElement("label");
    const workTitle = document.createElement("input");
    const workCategory = document.createElement("input");


    closeBtn.classList.add("fa-solid", "fa-xmark");
    closeBtn.setAttribute("id", "xmark");
    modal.appendChild(closeBtn);

    previous.classList.add("fa-solid", "fa-arrow-left");
    previous.setAttribute("id", "previous");
    modal.appendChild(previous);

    modal.setAttribute("id", "modal");
    editBar.appendChild(modal);

    title.innerText = "Ajout photo";
    title.setAttribute("id", "title");
    modal.appendChild(title);

    form.setAttribute("id", "form-post-picture");
    modal.appendChild(form);

    divImg.setAttribute("id", "modal-post-picture");
    form.appendChild(divImg);

    imgI.classList.add("fa-regular", "fa-image");
    divImg.appendChild(imgI);

    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("id", "input-upload");
    divImg.appendChild(fileInput);

    workTitle.setAttribute("id", "work-title");
    workCategory.setAttribute("id", "work-category");


    labelImg.htmlFor = "input-upload";
    labelImg.setAttribute("id", "labelImg");
    labelImg.innerHTML = "+ Ajouter photo";
    divImg.appendChild(labelImg);

    labelTitle.htmlFor = "work-title";
    labelTitle.innerHTML = "Titre";
    labelTitle.classList.add("labelModal");
    form.appendChild(labelTitle);
    form.appendChild(workTitle);

    labelCategory.htmlFor = "work-category";
    labelCategory.innerHTML = "Catégorie";
    labelCategory.classList.add("labelModal");
    form.appendChild(labelCategory);
    form.appendChild(workCategory);

    
    modalSubmit.innerHTML =  "Ajouter une photo";
    modalSubmit.setAttribute("id", "modal-prepost-img");
    modal.appendChild(modalSubmit);


    

    closeBtn.addEventListener("click", function() {

        closeModal();
    });

    overlay.addEventListener("click", function(event) {

        const clickInside = modal.contains(event.target);
    
        if (clickInside === false) {
    
            closeModal();    
        }
    });

    previous.addEventListener("click", function() {

        closeModal();
        generateModal();
    });

}

function closeModal() {

    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    modal.remove();
    overlay.remove(); 

}
