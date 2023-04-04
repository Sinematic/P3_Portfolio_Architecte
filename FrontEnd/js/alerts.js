export function displayError(localStorageValue, parentElement, id="") {

    const previousMessages = document.querySelectorAll('.success-message');

    for (let i = 0; i < previousMessages.length; i++)
    {
        previousMessages[i].remove();
    }

    const previousErrorMessages = document.querySelectorAll('.error-message');

    for (let i = 0; i < previousErrorMessages.length; i++)
    {
        previousErrorMessages[i].remove();
    }

    window.localStorage.setItem("error-message", localStorageValue);

    const error = window.localStorage.getItem("error-message");
    let message = document.createElement("p");

    message.classList.add("error-message");
    message.innerText = error;

    parentElement.appendChild(message);

    if (id) {
        message.setAttribute("id", id);
    }

    setTimeout(function() 
    {
        message.remove();
        window.localStorage.removeItem("error-message");
    }, 5000);

}

export function displaySuccess(localStorageValue, parentElement, id="") {

    const previousMessages = document.querySelectorAll('.success-message');

    for (let i = 0; i < previousMessages.length; i++)
    {
        previousMessages[i].remove();
    }

    const previousErrorMessages = document.querySelectorAll('.error-message');

    for (let i = 0; i < previousErrorMessages.length; i++)
    {
        previousErrorMessages[i].remove();
    }

    window.localStorage.setItem("success-message", localStorageValue);

    const success = window.localStorage.getItem("success-message");
    let message = document.createElement("p");

    message.classList.add("success-message");
    message.innerText = success;

    parentElement.appendChild(message);

    if (id) {
        message.setAttribute("id", id);
    }

    setTimeout(function() 
    {
        message.remove();
        window.localStorage.removeItem("success-message");
    }, 6665000);

}