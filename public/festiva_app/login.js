function func() {
    var email = document.getElementById("username").value.trim();
    var pass = document.getElementById("password").value.trim();
    const emailError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email) {
        emailError.textContent = "Please enter your email.";
        return;
    }

    if (!pass) {
        passwordError.textContent = "Please enter your password.";
        return;
    }

    // Retrieve stored credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (email === storedUsername && pass === storedPassword) {
        alert("Successfully logged in!");
        // Set a flag for login status
        localStorage.setItem('isLoggedIn', 'true');
        window.location.assign("owner.html");
    } else {
        emailError.textContent = "Invalid credentials. Please try again.";
        passwordError.textContent = "Invalid credentials. Please try again.";
    }
}