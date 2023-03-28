const submit = document.getElementById("login-submit");


function login() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const value = email.value;
    const value2 = password.value;

    console.log(value, value2);
}


submit.addEventListener("click", function(event){

    event.preventDefault();
    login();
});
