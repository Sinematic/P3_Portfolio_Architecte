const token = window.localStorage.getItem("token");

if (token) {
    window.localStorage.removeItem("token");
} 

window.location.href = "login.html";