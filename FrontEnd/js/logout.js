const token = window.localStorage.getItem("token");

if (token) {
    window.localStorage.removeItem("token");
    window.localStorage.setItem("success-message", "Déconnexion . . .");
} 

window.location.href = "login.html";