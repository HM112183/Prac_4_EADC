document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.event-form');
    const eventName = document.getElementById('event-name');
    const capacity = document.getElementById('capacity');
    const location = document.getElementById('location'); // Changed label
    const eventDate = document.getElementById('event-date');
    const bookButton = document.getElementById('bookButton');

    // --- HELPER FUNCTION ---
    function createErrorMessageElement(inputElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        inputElement.parentNode.appendChild(errorDiv);
        return errorDiv;
    }

    // Create or get error message elements (CRITICAL!)
    let eventNameError = document.getElementById('eventNameError') || createErrorMessageElement(eventName);
    let capacityError = document.getElementById('capacityError') || createErrorMessageElement(capacity);
    let locationError = document.getElementById('locationError') || createErrorMessageElement(location);
    let eventDateError = document.getElementById('eventDateError') || createErrorMessageElement(eventDate);

    bookButton.removeAttribute('onclick');

    bookButton.addEventListener('click', function (event) {
        event.preventDefault();

        let isValid = true;

        // Reset error messages
        eventNameError.textContent = "";
        capacityError.textContent = "";
        locationError.textContent = "";
        eventDateError.textContent = "";

        // Validate Event Name
        if (eventName.value.trim() === '') {
            eventNameError.textContent = "Event CodeName is required.";
            isValid = false;
        } else if (eventName.value.length < 3) {
            eventNameError.textContent = "Event CodeName must be at least 3 characters.";
            isValid = false;
        }

        // Validate Capacity
        if (capacity.value === '') {
            capacityError.textContent = "Please select attendee capacity.";
            isValid = false;
        }

        // Validate Location (Now a simple text check)
        if (location.value.trim() === '') {
            locationError.textContent = "Event Location is required."; // Changed message
            isValid = false;
        } else if (location.value.length < 3) {
            locationError.textContent = "Event Location must be at least 3 characters.";
            isValid = false;
        }

        // Validate Event Date
        if (eventDate.value === '') {
            eventDateError.textContent = "Event Date is required.";
            isValid = false;
        } else if (new Date(eventDate.value) < new Date()) {
            eventDateError.textContent = "Event Date cannot be in the past.";
            isValid = false;
        }

        if (isValid) {
            window.location.href = 'second_interface.html';
        }
    });
});