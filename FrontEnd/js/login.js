const submit = document.getElementById("login-submit");
let connected = false;

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email !== "" && password !== "") {

        const combo = JSON.stringify({
            "email": email,
            "password": password
        });
    
        console.log(combo[0], combo[1]);


        const response = await fetch("http://localhost:5678/api/users/login", 
        {
            method: "POST",
            body: combo,
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        console.log(response.ok);
    
        if (response.ok) {

            connected = true;
            console.log(connected);
            window.location.href = "index.html";

        } else {

            const login = document.getElementById("login");
            let message = document.createElement("p");
            
            message.classList.add("error-message");
            message.innerText = "Identifiants incorrects !";
            
            login.appendChild(message);

        }

    }

}


submit.addEventListener("click", function(event){

    event.preventDefault();
    login();
});
