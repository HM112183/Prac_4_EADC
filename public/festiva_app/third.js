document.addEventListener('DOMContentLoaded', function() {
    //  Get all input elements and error message divs
    const venueNameInput = document.getElementById('venue-name');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const customerNameInput = document.getElementById('customer-name');
    const customerEmailInput = document.getElementById('customer-email');

    const venueNameError = document.getElementById('venue-name-error');
    const eventDateError = document.getElementById('event-date-error');
    const eventTimeError = document.getElementById('event-time-error');
    const customerNameError = document.getElementById('customer-name-error');
    const customerEmailError = document.getElementById('customer-email-error');

    const bookingForm = document.getElementById('booking-form');

    //  Populate Venue Name
    const urlParams = new URLSearchParams(window.location.search);
    const selectedVenue = urlParams.get('venue');
    venueNameInput.value = selectedVenue;

    //  Form Submission Handler
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); //  Prevent default form submission

        let isValid = true;

        //  Validation functions
        function validateRequired(input, errorDiv, message) {
            if (!input.value.trim()) {
                errorDiv.textContent = message;
                isValid = false;
            } else {
                errorDiv.textContent = "";
            }
        }

        function validateEmail(input, errorDiv) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                errorDiv.textContent = "Invalid Email format";
                isValid = false;
            } else {
                errorDiv.textContent = "";
            }
        }

        function validateTickets(input, errorDiv) {
            if (!input.value || parseInt(input.value) < 1) {
                errorDiv.textContent = "Number of Tickets is required and must be at least 1";
                isValid = false;
            } else {
                errorDiv.textContent = "";
            }
        }

        //  Perform Validation
        validateRequired(venueNameInput, venueNameError, "Venue Name is required");
        validateRequired(eventDateInput, eventDateError, "Event Date is required");
        validateRequired(eventTimeInput, eventTimeError, "Event Time is required");
        validateRequired(customerNameInput, customerNameError, "Your Name is required");
        validateRequired(customerEmailInput, customerEmailError, "Your Email is required");
        if (customerEmailError.textContent === "") { // Only validate format if not empty
            validateEmail(customerEmailInput, customerEmailError);
        }

        //  If Valid, Process Booking
        if (isValid) {
            const bookingData = {
                venueName: venueNameInput.value,
                eventDate: eventDateInput.value,
                eventTime: eventTimeInput.value,
                customerName: customerNameInput.value,
                customerEmail: customerEmailInput.value,
                additionalNotes: document.getElementById('additional-notes').value,
                bookingDate: new Date().toISOString()
            };

            console.log('Booking Data:', bookingData);
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(bookingData);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            alert('Booking Confirmed!');
            window.location.href = 'second_interface.html';
        }
    });
});