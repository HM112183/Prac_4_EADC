document.addEventListener("DOMContentLoaded", () => {
    const eventList = document.getElementById("event-list");
    const addEventForm = document.getElementById("add-event-form");
    const bookingList = document.getElementById('booking-list');
    const bookingSummary = document.getElementById('booking-summary');
    const toggleBookingsButton = document.getElementById('toggle-bookings');

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirect to the login page if not logged in
        window.location.href = 'login.html';
    }

    //  --- EVENT DETAILS ---
    let events = JSON.parse(localStorage.getItem('events') || '[]'); // Load events from localStorage or initialize to []

    function displayEvents() {
        eventList.innerHTML = "";
        events.forEach((event, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="event-item">
                    <span class="event-name">${event.name}</span>
                    <p class="event-details">
                        Category: ${event.category}, 
                        Location: ${event.location}, 
                        Date: ${event.date}, 
                        Time: ${event.time}, 
                        Capacity: ${event.capacity}
                    </p>
                    <p class="event-description">${event.description}</p>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
            eventList.appendChild(listItem);
        });
    }

    eventList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const index = e.target.dataset.index;
            events = events.filter((_, i) => i !== parseInt(index));
            localStorage.setItem('events', JSON.stringify(events));
            displayEvents();
        }
    });

    addEventForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newEvent = {
            name: e.target.elements["event-name"].value,
            category: e.target.elements["event-category"].value,
            location: e.target.elements["event-location"].value,
            date: e.target.elements["event-date"].value,
            time: e.target.elements["event-time"].value,
            capacity: e.target.elements["event-capacity"].value,
            description: e.target.elements["event-description"].value,
        };

        let hasErrors = false;
        if (!newEvent.name.trim()) {
            alert('Event Name is required');
            hasErrors = true;
        }
        if (!newEvent.category) {
            alert('Event Category is required');
            hasErrors = true;
        }
        if (!newEvent.location.trim()) {
            alert('Event Location is required');
            hasErrors = true;
        }
        if (!newEvent.date) {
            alert('Event Date is required');
            hasErrors = true;
        }
        if (!newEvent.time) {
            alert('Event Time is required');
            hasErrors = true;
        }
        if (!newEvent.capacity) {
            alert('Event Capacity is required');
            hasErrors = true;
        }
        if (!newEvent.description.trim()) {
            alert('Event Description is required');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
        addEventForm.reset();
    });

    displayEvents(); // Initial display of events!

    //  --- BOOKING DETAILS ---
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');  // Load bookings from localStorage

    function displayBookings() {
        if (bookings.length === 0) {
            bookingSummary.textContent = 'No bookings yet.';
            bookingList.innerHTML = '';
            return;
        }

        bookingSummary.textContent = `Total Bookings: ${bookings.length}`;  // Simple summary

        bookingList.innerHTML = '';
        bookings.forEach((booking, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${booking.venueName}</span> - 
                <span>${booking.customerName}</span> - 
                <span>${booking.eventDate} ${booking.eventTime}</span>
                <button class="delete-booking" data-index="${index}">Delete</button>  
            `;
            bookingList.appendChild(listItem);
        });
    }

    displayBookings(); // Initial display of bookings!

    //  Toggle booking details
    toggleBookingsButton.addEventListener('click', () => {
        const isCurrentlyHidden = window.getComputedStyle(bookingSummary).display === 'none';

        bookingSummary.style.display = isCurrentlyHidden ? 'block' : 'none';
        bookingList.style.display = isCurrentlyHidden ? 'block' : 'none';
        toggleBookingsButton.textContent = isCurrentlyHidden ? 'Hide Bookings' : 'Show Bookings';
    });

    bookingList.addEventListener('click', (e) => {  //  Event delegation for delete
        if (e.target.classList.contains('delete-booking')) {
            const index = parseInt(e.target.dataset.index, 10);  // Get the index
            bookings = bookings.filter((_, i) => i !== index);  // Remove from array
            localStorage.setItem('bookings', JSON.stringify(bookings));  // Update localStorage
            displayBookings();  // Refresh the display
        }
    });
});