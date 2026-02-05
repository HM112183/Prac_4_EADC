// --- Navigation Toggle Script ---
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav ul li a');

// Add an event listener to the toggle button
menuToggle.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation menu
    mainNav.classList.toggle('active');
    // Toggle the hamburger icon to an 'X' icon
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close the menu when a navigation link is clicked (for smooth scrolling)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});


// --- Contact Form Validation Script ---

// Get references to form elements and message displays
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

/**
 * Displays an error message for a given input field.
 * @param {HTMLElement} errorElement - The paragraph element to display the error.
 * @param {string} message - The error message to display.
 */
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block'; // Ensure error message is visible
}

/**
 * Clears the error message for a given input field.
 * @param {HTMLElement} errorElement - The paragraph element whose error message to clear.
 */
function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none'; // Hide error message when clear
}

/**
 * Validates the name input field.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameError, 'Name is required.');
        return false;
    }
    clearError(nameError);
    return true;
}

/**
 * Validates the email input field.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function validateEmail() {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        showError(emailError, 'Email is required.');
        return false;
    }
    if (!emailRegex.test(emailValue)) {
        showError(emailError, 'Please enter a valid email address.');
        return false;
    }
    clearError(emailError);
    return true;
}

/**
 * Validates the message input field.
 * @returns {boolean} True if the message is valid, false otherwise.
 */
function validateMessage() {
    const messageValue = messageInput.value.trim();
    if (messageValue === '') {
        showError(messageError, 'Message is required.');
        return false;
    }
    clearError(messageError);
    return true;
}

// Add event listeners for real-time validation feedback (on input change)
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);


// Add event listener for form submission
contactForm.addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Hide any previous success message
    successMessage.classList.add('hidden');

    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
        // In a real application, you would send the form data to a server here.
        // For this task, we just show a success message.
        successMessage.classList.remove('hidden'); // Show success message
        contactForm.reset(); // Clear the form fields
        // Clear all error messages after successful submission
        clearError(nameError);
        clearError(emailError);
        clearError(messageError);

        // Optionally hide the success message after a few seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000); // Hide after 5 seconds
    }
});