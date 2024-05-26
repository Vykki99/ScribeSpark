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

    // Load the accounts from localStorage
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

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

        // Validate the form fields
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!username) {
            setInputError(document.getElementById('loginUsername'), "Username is required");
            return;
        }

        if (!password) {
            setInputError(document.getElementById('loginPassword'), "Password is required");
            return;
        }

        // Check if the username matches any of the stored accounts
        const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        let isValidAccount = false;

        for (const account of storedAccounts) {
            if (username === account.username || username === account.email) {
                isValidAccount = true;

                // Check if the password matches the stored password
                if (sha256(password) === account.password) {
                    // Clear the form
                    loginForm.reset();

                    // Show success message
                    setFormMessage(loginForm, "Login successful");

                    // Redirect to mainstream screen
                    setTimeout(() => {
                        window.location.href = "mainstream.html";
                    }, 750);
                    break;

                } else {
                    // Show error message
                    setFormMessage(loginForm, "Invalid password", "form__message--error");
                }
            }
        }

        if (!isValidAccount) {
            // Show error message
            setFormMessage(loginForm, "Invalid username", "form__message--error");
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

        if (password !== confirmPassword) {
            setInputError(document.getElementById('signupPassword'), "Passwords do not match");
            setInputError(document.getElementById('confirmPassword'), "Passwords do not match");
            return;
        }

        // Create a new account
        const account = {
            username: username,
            email: email,
            password: sha256(password)
        };

        // Add the new account to the array of accounts
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        accounts.push(account);

        // Save the array of accounts in localStorage
        localStorage.setItem("accounts", JSON.stringify(accounts));

        // Clear the form
        createAccountForm.reset();

        // Show success message
        setFormMessage(createAccountForm, "Sign up successful");

        // Redirect to mainstream screen
        setTimeout(() => {
            window.location.href = "mainstream.html";
        }, 750);
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