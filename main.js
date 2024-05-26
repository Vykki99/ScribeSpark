// Add this function to hash the password
function sha256(str) {
    return CryptoJS.SHA256(str).toString();
}

// Modify the setFormMessage function to accept a form element and a message
function setFormMessage(formElement, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--error`);
}

// Modify the setInputError function to accept an input element and a message
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

// Modify the clearInputError function to accept an input element
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const hashedPassword = sha256(password);

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && hashedPassword === storedPassword) {
            // Login successful
            setFormMessage(loginForm, "Login successful");
        } else {
            // Login failed
            setFormMessage(loginForm, "Invalid username/password combination");
        }
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        // Validate the form fields
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!username) {
            setInputError(document.getElementById('signupUsername'), "Username is required");
            return;
        }

        if (!email) {
            setInputError(document.getElementById('signupEmail'), "Email is required");
            return;
        }

        if (!password) {
            setInputError(document.getElementById('signupPassword'), "Password is required");
            return;
        }

        if (password!== confirmPassword) {
            setInputError(document.getElementById('confirmPassword'), "Passwords do not match");
            return;
        }

        // Perform your AJAX/Fetch sign up
        const hashedPassword = sha256(password);

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', hashedPassword);

        // Clear the form
        createAccountForm.reset();

        // Show success message
        setFormMessage(createAccountForm, "Sign up successful");

        // Redirect to login screen
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});