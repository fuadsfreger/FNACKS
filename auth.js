// auth.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to main page
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;
            
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.username === username)) {
                alert("User already exists!");
                return;
            }
            
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! You can now log in.");
            window.location.href = "index.html";
        });
    }
});
