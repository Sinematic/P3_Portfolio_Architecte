const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");

async function getData(url) {

    const base = "http://localhost:5678/api/"
    const response = await fetch(base + url);
    const result = await response.json();

    for (let i = 0; i < result.length; i++)
    {
        renderWork(result[i]);
    }
}

getData("works");


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

    const response = await fetch("http://localhost:5678/api/works");
    const result = await response.json();
    console.log(result);

    for(let i = 0; i < result.length; i++)
    {
        console.log(result[i]);
    }
}

getCategories();