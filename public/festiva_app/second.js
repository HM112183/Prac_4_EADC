const searchInput = document.getElementById('searchBar');
const venueSection = document.getElementById('venueSection');
const venueCards = document.querySelectorAll('.venue-card');
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownLink = document.querySelector('.dropdown > a');

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    let found = false;

    venueCards.forEach(card => {
        const venueName = card.querySelector('h3').textContent.toLowerCase();
        if (venueName.includes(searchValue)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    const noResult = document.getElementById('noResult');

    if (!found) {
        if (!noResult) {
            const div = document.createElement('div');
            div.id = 'noResult';
            div.className = 'fade-in';
            div.style = 'text-align:center; font-size:20px; margin-top:50px;';
            div.innerHTML = '減 Oops! No Venue Found. Try Another! 減';
            venueSection.appendChild(div);
        }
    } else {
        if (noResult) noResult.remove();
    }
});

function filterCity(cityName) {
    let anyVisible = false;

    venueCards.forEach(card => {
        const venueCity = card.querySelector('p.city').textContent.toLowerCase();
        if (venueCity.includes(cityName.toLowerCase())) {
            card.style.display = 'block';
            anyVisible = true;
        } else {
            card.style.display = 'none';
        }
    });

    const noResult = document.getElementById('noResult');
    if (!anyVisible) {
        if (!noResult) {
            const div = document.createElement('div');
            div.id = 'noResult';
            div.className = 'fade-in';
            div.style = 'text-align:center; font-size:20px; margin-top:50px;';
            div.innerHTML = `月 No Venues Available for ${cityName}! 月`;
            venueSection.appendChild(div);
        }
    } else {
        if (noResult) noResult.remove();
    }

    // Close the dropdown after a city is selected
    dropdownContent.style.display = 'none';
}

// Prevent the dropdown from closing immediately when the link is clicked
dropdownLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown when clicking outside of it
document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

function toggleDetails(button) {
    const details = button.parentElement.querySelector('.hidden-details');
    details.classList.toggle('show-details');
    button.textContent = button.textContent === 'Details' ? 'Book Now' : 'Details';

    if (button.textContent === 'Book Now') {
        const venueName = button.parentElement.parentElement.querySelector('h3').textContent;
        button.onclick = function() { bookVenue(venueName); };
    } else {
        button.onclick = function() { toggleDetails(this); };
    }
}

function bookVenue(venueName) {
    window.location.href = `third_interface.html?venue=${encodeURIComponent(venueName)}`;
}