export function displayError(localStorageValue, parentElement, id="") {

    let old = document.querySelectorAll(".error-message");

    if (old !== null) {

        old.innerHTML ="";
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
