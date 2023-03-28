const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");

const noFilter = document.getElementById("no-filter");
const objects = document.getElementById("objects");
const houses = document.getElementById("houses");
const hotelsRestaurants = document.getElementById("hotels-restaurants");


getData();

noFilter.style.color = "white";
noFilter.style.backgroundColor = "#1D6154";

async function getData(url = "works") {

    const base = "http://localhost:5678/api/"
    const response = await fetch(base + url);
    const result = await response.json();

    gallery.innerHTML = "";

    for (let i = 0; i < result.length; i++)
    {
        renderWork(result[i]);
        console.log(result[i]);
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


getCategories();

noFilter.addEventListener("click", function() {

    getData();
    noFilter.style.color = "white";
    noFilter.style.backgroundColor = "#1D6154";
});


objects.addEventListener("click", function() {

    displayCategory(1);
    noFilter.style.color = "#1D6154";
    noFilter.style.backgroundColor = "white";
});


houses.addEventListener("click", function() {

    displayCategory(2);
    noFilter.style.color = "#1D6154";
    noFilter.style.backgroundColor = "white";
});


hotelsRestaurants.addEventListener("click", function() {

    displayCategory(3);
    noFilter.style.color = "#1D6154";
    noFilter.style.backgroundColor = "white";
});


async function displayCategory(int) {

    const url = "http://localhost:5678/api/works"
    const response = await fetch(url);
    const result = await response.json();

    gallery.innerHTML = "";

    console.log(result[0].categoryId === int);

    for (let i = 0; i < result.length; i++)
    {
        if (result[i].categoryId === int) {
            renderWork(result[i]);
        }
        
    }
}