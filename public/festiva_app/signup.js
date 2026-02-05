function signup() {
    var username = document.getElementById("signup-username").value.trim();
    var password = document.getElementById("signup-password").value.trim();
    var usernameError = document.getElementById('username-error');
    var passwordError = document.getElementById('password-error');

    // Clear previous errors
    usernameError.textContent = "";
    passwordError.textContent = "";

    if (!username) {
        usernameError.textContent = "Please enter a username.";
        return;
    }

    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Simulate successful signup by storing in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert("Sign up successful!");
    window.location.assign("owner.html");
}