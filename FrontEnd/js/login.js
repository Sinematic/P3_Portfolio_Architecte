import { displayError } from "./alerts.js";

const submit = document.getElementById("login-submit");
const token = window.localStorage.getItem("token");
console.log(token);

if (token) {
    window.location.href = "index.html";
}

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email !== "" && password !== "") {

        const combo = JSON.stringify({
            "email": email,
            "password": password
        });


        const response = await fetch("http://localhost:5678/api/users/login", 
        {
            method: "POST",
            body: combo,
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        // console.log(response);
    
        if (response.ok) {

            const result = await response.json();
            const token = result.token;
            console.log(result.token);
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("temp", result);
            window.location.href = "index.html";

        } else {

            const form = document.querySelector("form");
            displayError("Identifiants incorrects !", form, "wrong-id");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        } 

    } else {

        const form = document.querySelector("form");
        displayError("Champs non remplis", form, "wrong-id");
    }

}


submit.addEventListener("click", function(event){

    event.preventDefault();
    login();
});
