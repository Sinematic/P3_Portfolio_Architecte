import { displayError, displaySuccess } from "./alerts.js";

const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");

const login = document.getElementById("login");
const logout = document.getElementById("logout");

const btnNoFilter = document.getElementById("btn-no-filter");
const btnObjects = document.getElementById("btn-objects");
const btnHouses = document.getElementById("btn-houses");
const btnHotelsRestaurants = document.getElementById("btn-hotels-restaurants");

const token = window.localStorage.getItem("token");
const success = window.localStorage.getItem("success-message");

if (token) {

    login.style.display = "none";
    logout.style.display = "block";
    //displayEditBar();

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
        console.log(result[i]);
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

    const editBar = document.createElement("div");
    editBar.setAttribute("id", "edit-bar");
    const header = document.querySelector("header");
    const body = document.querySelector("body");
    header.appendChild(editBar);

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
