document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("click", () => {
        // Redirect to index.html
        window.location.href = "index.html";
    });
});